"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artwork = void 0;
const index_1 = __importDefault(require("../index"));
const sequelize_1 = require("sequelize");
const ribbons_1 = require("./ribbons");
const rounds_1 = require("./rounds");
const users_1 = require("./users");
const games_1 = require("./games");
const Artwork = index_1.default.define('artwork', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    artworkSrc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ribbon_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ribbons_1.Ribbon,
            key: 'id'
        },
        allowNull: true
    },
    round_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: rounds_1.Round,
            key: 'id'
        },
        allowNull: true
    },
    artist_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: users_1.User,
            key: 'id'
        },
        allowNull: true
    },
    game_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: games_1.Game,
            key: 'id'
        },
        allowNull: false
    }
});
exports.Artwork = Artwork;
//# sourceMappingURL=artworks.js.map