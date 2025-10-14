const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Asumiendo que tienes configuración de DB

class Profile extends Model {}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
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
  modelName: 'Profile',
  tableName: 'profiles',
  timestamps: false
});

module.exports = { Profile };