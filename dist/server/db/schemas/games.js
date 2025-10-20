"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const index_1 = __importDefault(require("../index"));
const sequelize_1 = require("sequelize");
const Game = index_1.default.define("game", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    gameCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.Game = Game;
//# sourceMappingURL=games.js.map