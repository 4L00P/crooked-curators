"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRouter = void 0;
const express_1 = require("express");
// Game model from DB
const games_1 = require("../db/schemas/games");
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
//# sourceMappingURL=create-game.js.map