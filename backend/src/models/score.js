const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Score = sequelize.define('Score', {
  playerWallet: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^0x[a-fA-F0-9]{64}$/
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'scores',
  indexes: [
    {
      unique: false,
      fields: ['score']
    }
  ]
});

module.exports = Score;
