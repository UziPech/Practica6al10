const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

class New extends Model {}

New.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    allowNull: false
  },
  estado_id: {
    type: DataTypes.INTEGER,
    references: {
      model: State,
      key: 'id'
    },
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  resumen: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fechapublicacion: {
    type: DataTypes.DATE,
    allowNull: true
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
  modelName: 'New',
  tableName: 'news',
  timestamps: false
});

// Definir relaciones
New.belongsTo(Category, { foreignKey: 'categoria_id', as: 'categoria' });
New.belongsTo(State, { foreignKey: 'estado_id', as: 'estado' });
New.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

Category.hasMany(New, { foreignKey: 'categoria_id', as: 'noticias' });
State.hasMany(New, { foreignKey: 'estado_id', as: 'noticias' });
User.hasMany(New, { foreignKey: 'usuario_id', as: 'noticias' });

module.exports = { New };