"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const games_1 = require("../schemas/games");
const users_games_1 = require("../schemas/users-games");
// update the User_Game table when someone joins a room
const updateUsersGames = (roomCode, userPk) => {
    // get game ID from Game table according to inputted roomCode
    const game = games_1.Game.findOne({ where: { gameCode: roomCode } });
    const gamePk = game.id;
    // insert into the users games table 
    users_games_1.User_Game.create({
        user_id: userPk,
        game_id: gamePk
    });
};
/*
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  game_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: 'id'
    },
    allowNull: false
  }


*/
//# sourceMappingURL=user-gamesHelpers.js.map