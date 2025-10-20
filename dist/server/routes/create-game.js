"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRouter = void 0;
const express_1 = require("express");
// Game model from DB
const games_1 = require("../db/schemas/games");
const users_games_1 = require("../db/schemas/users-games");
/**
 * game router -> /games
 */
exports.gamesRouter = (0, express_1.Router)();
// make a random string to make a game code with
// 8 characters long
const randomString = () => {
    return Math.random().toString(36).slice(2, 10);
};
// handle request to create a game
exports.gamesRouter.post('/create', (req, res) => {
    const room = randomString();
    console.log('user in game: ', req.user);
    //@ts-ignore
    console.log('session in game: ', req.session);
    // create a room in the database with the random string
    games_1.Game.create({
        gameCode: room
    })
        .then(game => {
        res.json(game);
    })
        .catch(err => {
        console.log('could not add game to db', err);
    });
});
// THIS ONE IS NOT WORKING :(
// serves to add a player to a game in the User_Game table
exports.gamesRouter.post('/players/join', (req, res) => {
    // send whole game into the request body
    const { game } = req.body;
    console.log('request user id:', req.user);
    // add an entry to user_game using user id and game id
    users_games_1.User_Game.create({
        user_id: req.user.id,
        game_id: game.id
    })
        .then(() => {
        res.sendStatus(201);
    })
        .catch((err) => {
        //console.log('Error adding to user_game table', err);
        res.sendStatus(500);
    });
});
/*
   // get the socket id from the DB
      const userObj = User.findOne({ where: { id: 1} })
      const socketId = userObj.socketId

      // emit a joingame event to that socket
      io.sockets.sockets[socketId].emit('joinGame')
*/
//# sourceMappingURL=create-game.js.map