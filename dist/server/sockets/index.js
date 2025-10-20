"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = require("../app");
const socket_io_1 = require("socket.io");
const express_session_1 = __importDefault(require("express-session"));
const axios_1 = __importDefault(require("axios"));
// DB GAME MODEL
const games_1 = require("../db/schemas/games");
const users_1 = require("../db/schemas/users");
const users_games_1 = require("../db/schemas/users-games");
const rounds_1 = require("../db/schemas/rounds");
// session secret for express session
const { SESSION_SECRET, BASE_URL } = process.env;
// ----------SOCKET IO--------------
exports.io = new socket_io_1.Server(app_1.server, {
    connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 60 * 1000,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true
    }
});
exports.io.engine.use((0, express_session_1.default)({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false
}));
// _______________________________________________________________________________
// GLOBAL VARIABLES
// hold games and players (temporarily)
const gamesPlayersMap = new Map();
// type GameVariables = {
//   currentGame: any;
//   gameCode: string;
//   currentRound: any;
// }
// hold the current game information
let currentGame;
let currentRound;
let curator;
let roundCount = 0;
let allPlayers = [];
let stage = 'lobby';
// _______________________________________________________________________________
exports.io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`A player: ${socket.id} connected`);
    // _______________________________________________________________________________
    // DISCONNECT
    socket.on('disconnect', () => {
        console.log('A player disconnected');
    });
    // _______________________________________________________________________________
    // JOINING A ROOM
    socket.on('joinGame', (joinAttempt) => __awaiter(void 0, void 0, void 0, function* () {
        // 0) make sure the room is in the database
        // variable for checking if the room exists in the db
        const roomExists = yield games_1.Game.findOne({
            where: { gameCode: joinAttempt.roomCode }
        }).catch((err) => {
            console.error('Error checking if room exists', err);
        });
        // if the room exists, (it is not null)
        if (roomExists !== null) {
            // update currentGame variable with room
            currentGame = roomExists;
            // 1) join the room
            socket.join(joinAttempt.roomCode);
            // log a message for someone joining a room
            console.log(`player joined room ${joinAttempt.roomCode}`);
            // 2) add the player and game to user_games
            // find a user according to their socket id
            yield users_1.User.findOne({
                where: { socketId: socket.id }
            })
                .then((user) => {
                // create an entry to the user_games table
                user.update({ username: joinAttempt.username })
                    .then(() => {
                    // create an entry in user_games table
                    users_games_1.User_Game.create({
                        user_id: user.id,
                        game_id: roomExists.id
                    });
                });
            })
                .catch((err) => {
                console.error('Error adding to user_games', err);
            });
            // add player to map - TEMP SOLUTION -----------------------------------
            const playersSocketIds = gamesPlayersMap.get(joinAttempt.roomCode) || [];
            playersSocketIds.push(joinAttempt.username);
            gamesPlayersMap.set(joinAttempt.roomCode, playersSocketIds);
            //----------------------------------------------------------------------
            // to the specific room, emit the room code - make it visible for everyone
            //TODO - update context with code, players array
            exports.io.to(joinAttempt.roomCode).emit('sendRoomDetails', {
                roomCode: joinAttempt.roomCode,
                game: roomExists,
                type: 'join',
                players: playersSocketIds
            });
        }
        else {
            // if the room does not exist in the db, don't join
            console.log('room does not exist in the db');
            // emit event back to user informing them the code doesn't work
            // something like: socket.emit("badCode")
        }
    })); // end of join game
    // _______________________________________________________________________________
    // STARTING A GAME 
    socket.on('startGame', () => __awaiter(void 0, void 0, void 0, function* () {
        // query user_games table, find users where gameid = current game id
        // sort by created at order
        allPlayers = yield users_games_1.User_Game.findAll({
            where: {
                game_id: currentGame.id
            },
            order: [['createdAt', 'ASC']]
        });
        // calls advance round with prev round of null
        advanceRound(null);
    }));
    // _______________________________________________________________________________
    // ROUND PROGRESSION HANDLER
    function advanceRound(prevRound) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('advancing round!');
            console.log('allPlayers length', allPlayers.length, 'prevRound', prevRound, 'roundCount', roundCount);
            // ROUND COUNT LOGIC
            if (prevRound === null) {
                // if prevRound is null, it's the first round
                roundCount = 0;
            }
            else if (prevRound < allPlayers.length - 1) {
                // if prevRound is less than the amount of players(-1), progress
                roundCount += 1;
            }
            else if (prevRound === allPlayers.length - 1) {
                // if the prevRound is the amount of players (-1), end of the game go to gallery
                exports.io.to(currentGame.gameCode).emit('stageAdvance', 'gallery');
                return;
            }
            // select curator based on roundCount index on the allPlayers array
            curator = yield users_1.User.findOne({
                where: { id: allPlayers[roundCount].user_id }
            });
            console.log('allPlayers array:', allPlayers);
            // assign currentRound, then add round to database
            currentRound = yield rounds_1.Round.create({
                game_id: currentGame.id,
                curator_id: curator.id
            });
            // variable to hold array of 3 ribbons
            let ribbonsForRound;
            // select 3 ribbons for the round
            const getRibbons = () => __awaiter(this, void 0, void 0, function* () {
                yield axios_1.default.get(`${BASE_URL}/ribbons`)
                    .then(({ data }) => {
                    // assign the returned array of ribbons to ribbonsForRound
                    ribbonsForRound = data;
                })
                    .catch((err) => {
                    console.error('Failed to GET ribbons: SERVER:', err);
                });
            });
            yield getRibbons();
            // GAME CONTEXT
            // define the round's state (matches front end round context)
            let roundState = {
                stage: 'reference',
                role: 'artist',
                ribbons: ribbonsForRound,
                code: currentGame.gameCode,
                curator: {
                    username: curator.username,
                    finished: false
                },
                players: allPlayers.map((_a) => __awaiter(this, [_a], void 0, function* ({ user_id }) {
                    const player = yield users_1.User.findOne({ where: { id: user_id } });
                    // add only the parts needed for other players
                    return { username: player.username, finished: false };
                }))
            };
            // player emit - targets game room except curator
            // pass in roundState
            exports.io.to(currentGame.gameCode).except(curator.socketId).emit('newRound', roundState);
            // reassign roundState values for the curator
            roundState.role = 'curator';
            // curator emit - targets only curator socket
            // pass in roundState
            exports.io.to(curator.socketId).emit('newRound', roundState);
        });
    } // end of advance round func
    // _______________________________________________________________________________
    // ADVANCING A STAGE
    // nextStage updates the stage on the game context
    function advanceStage(stage) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('next stage event triggered!');
            /*
            check stage of current round (get round from db)
              if reference, set to painting
              if painting, set to judging
                - determine ribbons
              if judging, create new round (with advanceRound)
                - determine winners
                -
              POTENTIAL ISSUES;
                multiple emits occur, causing stages to advance before user input
                  fix: only one client can emit the event, button disabled after one click
            */
        });
    }
    // _______________________________________________________________________________
    // TO JUDGING
    // emitted from client when judge hits 'To Judging!' button
    socket.on('toJudging', () => {
        // call advanceStage stage function 
        // update stage of the room from painting -> judging
        exports.io.to(currentGame.gameCode).emit('stageAdvance', 'judging');
    });
    // _______________________________________________________________________________
    // TO LOBBY
    // emitted from client when someone hits the 'Play Again?' button in the gallery
    socket.on('toLobby', () => {
        console.log('returning to lobby!');
        // call advanceStage stage function 
        // update stage of the room from gallery -> lobby
        exports.io.to(currentGame.gameCode).emit('stageAdvance', 'lobby');
    });
    // _______________________________________________________________________________
    // ADVANCING A ROUND
    // hit after judge makes ribbon selections
    socket.on('newRound', () => {
        advanceRound(roundCount);
    });
    // _______________________________________________________________________________
    // CURATOR SELECTION
    socket.on('curatorSelect', (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, image }) {
        yield currentRound.update({ referenceName: title, referenceSrc: image });
        // send players to the artist stage
        console.log('ref updated ', title);
        exports.io.to(currentGame.gameCode).emit('referenceSelected', { title: title, src: image });
        // update stage of the room from reference to painting
        exports.io.to(currentGame.gameCode).emit('stageAdvance', 'painting');
    }));
})); // end of connection
// NOT WORKING - attempted to use reload to maintain session connection
// socket.request.session.reload((err) => {
//   if (err) {
//     return socket.disconnect();
//   }
//   socket.request.session.count++;
//   socket.request.session.save();
// });
//# sourceMappingURL=index.js.map