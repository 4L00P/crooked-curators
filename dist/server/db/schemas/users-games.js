"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Game = void 0;
const index_1 = __importDefault(require("../index"));
const sequelize_1 = require("sequelize");
const users_1 = require("./users");
const games_1 = require("./games");
const User_Game = index_1.default.define('user_game', {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: users_1.User,
            key: 'id'
        },
        allowNull: false
    },
    game_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: games_1.Game,
            key: 'id'
        },
        allowNull: false
    },
}, { timestamps: true });
exports.User_Game = User_Game;
//# sourceMappingURL=users-games.js.map