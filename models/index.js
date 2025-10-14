// Archivo central para configurar todas las relaciones entre modelos
const { Profile } = require('./ProfileModel');
const { User } = require('./UserModel');
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { New } = require('./NewModel');

// Configurar relaciones entre User y Profile
User.belongsTo(Profile, { 
  foreignKey: 'perfil_id', 
  as: 'perfil' 
});

Profile.hasMany(User, { 
  foreignKey: 'perfil_id', 
  as: 'usuarios' 
});

// Configurar relaciones entre New y Category
New.belongsTo(Category, { 
  foreignKey: 'categoria_id', 
  as: 'categoria' 
});

Category.hasMany(New, { 
  foreignKey: 'categoria_id', 
  as: 'noticias' 
});

// Configurar relaciones entre New y State
New.belongsTo(State, { 
  foreignKey: 'estado_id', 
  as: 'estado' 
});

State.hasMany(New, { 
  foreignKey: 'estado_id', 
  as: 'noticias' 
});

// Configurar relaciones entre New y User
New.belongsTo(User, { 
  foreignKey: 'usuario_id', 
  as: 'usuario' 
});

User.hasMany(New, { 
  foreignKey: 'usuario_id', 
  as: 'noticias' 
});

// Exportar todos los modelos con relaciones configuradas
module.exports = {
  Profile,
  User,
  Category,
  State,
  New
};

// Función para sincronizar todos los modelos
const syncAllModels = async (force = false) => {
  try {
    await Profile.sync({ force });
    await Category.sync({ force });
    await State.sync({ force });
    await User.sync({ force });
    await New.sync({ force });
    
    console.log('✅ Todos los modelos sincronizados correctamente');
  } catch (error) {
    console.error('❌ Error al sincronizar modelos:', error);
    throw error;
  }
};

module.exports.syncAllModels = syncAllModels;