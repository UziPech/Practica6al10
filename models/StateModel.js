const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class State extends Model {}

State.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  abreviacion: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fechaalta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  useralta: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'State',
  tableName: 'states',
  timestamps: false
});

module.exports = { State };