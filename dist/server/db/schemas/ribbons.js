"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ribbon = void 0;
const index_1 = __importDefault(require("../index"));
const sequelize_1 = require("sequelize");
const Ribbon = index_1.default.define('ribbon', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    source: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.Ribbon = Ribbon;
//# sourceMappingURL=ribbons.js.map