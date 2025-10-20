"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const index_1 = __importDefault(require("../index"));
const sequelize_1 = require("sequelize");
const games_1 = require("./games");
const users_1 = require("./users");
const Round = index_1.default.define('round', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    referenceSrc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    referenceName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    game_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: games_1.Game,
            key: 'id'
        }
    },
    curator_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: users_1.User,
            key: 'id'
        }
    },
    winner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: users_1.User,
            key: 'id'
        }
    }
});
exports.Round = Round;
//# sourceMappingURL=rounds.js.map