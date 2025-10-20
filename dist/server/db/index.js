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
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
// when making db locally, name it "crooked_curators"
// -------INITIALIZE SEQUELIZE--------
// initializing sequelize with database at localhost
const sequelize = new Sequelize('crooked_curators', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
// checks if connection to DB was successful
sequelize.authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
// -------INITIALIZE MODELS----------
// require all sequelize models
const users_games_1 = require("./schemas/users-games");
const artworks_1 = require("./schemas/artworks");
const ribbons_1 = require("./schemas/ribbons");
const users_1 = require("./schemas/users");
const rounds_1 = require("./schemas/rounds");
const games_1 = require("./schemas/games");
// establish relationships
// NOTE: user_games table seems to work fine w/o these relationships
// User.belongsToMany(Game, { through: User_Game });
// Game.belongsToMany(User, { through: User_Game });
// User.hasMany(User_Game);
// User_Game.belongsTo(User);
// Game.hasMany(User_Game);
// User_Game.belongsTo(Game);
// User.hasMany(Artwork);
// Artwork.belongsTo(Round);
// synchronize models individually
const syncModels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.User.sync();
        yield games_1.Game.sync();
        yield users_games_1.User_Game.sync();
        yield rounds_1.Round.sync();
        yield ribbons_1.Ribbon.sync();
        yield artworks_1.Artwork.sync();
        console.log('All models synchronized successfully');
    }
    catch (err) {
        console.error('failed to sync models', err);
    }
});
syncModels();
// synchronize all models at once - drop tables/ add new fields
// (async () => {
//   await sequelize.sync({force: true});
//     console.log('All models synchronized successfully.');
// })();
//# sourceMappingURL=index.js.map