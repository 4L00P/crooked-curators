const { Sequelize } = require('sequelize')

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
  })

  export default sequelize;



// -------INITIALIZE MODELS----------

// require all sequelize models

import { User_Game } from './schemas/users-games';
import { Artwork } from './schemas/artworks';
import { Ribbon } from './schemas/ribbons'
import { User } from './schemas/users';
import { Round } from './schemas/rounds'
import { Game } from './schemas/games';

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

const syncModels = async () => {
  try {
    await User.sync();
    await Game.sync();
    await User_Game.sync();
    await Round.sync();
    await Ribbon.sync();
    await Artwork.sync();

      console.log('All models synchronized successfully')
  } catch (err) {
    console.error('failed to sync models', err)
  }
}

syncModels();



