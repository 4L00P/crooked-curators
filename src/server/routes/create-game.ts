import { io } from '../sockets/index';
import { Router } from 'express';

// Game model from DB
import { Game } from '../db/schemas/games';

/**
 * game router -> /games
 */
export const gamesRouter = Router();

// make a random string to make a game code with
// 8 characters long
const randomString = () => {
  return Math.random().toString(36).slice(2, 10);
};

// handle request to create a game
gamesRouter.post('/create', (req: any, res) => {
  const room = randomString()

  console.log('user in game: ', req.user);
  //@ts-ignore
  console.log('session in game: ', req.session);

  // create a room in the database with the random string
  Game.create({ 
    gameCode: room 
  })
    .then(game => {
      res.json(game);
    })
    .catch(err => {
      console.log('could not add game to db', err);
    });

});


