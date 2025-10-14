const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { Profile } = require('./ProfileModel');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Profile,
      key: 'id'
    },
    allowNull: false
  },
  nick: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
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
  modelName: 'User',
  tableName: 'users',
  timestamps: false
});

// Definir relaciones
User.belongsTo(Profile, { foreignKey: 'perfil_id', as: 'perfil' });
Profile.hasMany(User, { foreignKey: 'perfil_id', as: 'usuarios' });

module.exports = { User };