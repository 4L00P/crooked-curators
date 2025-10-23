import sequelize from "../index";
import { DataTypes } from 'sequelize';

import { Ribbon } from "./ribbons"
import { Round } from "./rounds";
import { User } from "./users";
import { Game } from "./games"

const Artwork = sequelize.define('artwork', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  artworkSrc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ribbon_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ribbon,
      key: 'id'
    },
    allowNull: true
  },
  round_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Round,
      key: 'id'
    },
    allowNull: true
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: true
  },
  game_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: 'id'
    },
    allowNull: false
  }
});


export { Artwork }
