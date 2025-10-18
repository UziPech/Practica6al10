const { Sequelize } = require('sequelize');

// Inicializar Sequelize solo si hay configuración de base de datos
// Esto evita que en entornos serverless (p.ej. Vercel) se intente
// cargar el paquete del dialecto (mysql2) cuando no se ha configurado.
const DB_HOST = process.env.DB_HOST;

let sequelize = null;

if (DB_HOST && DB_HOST !== '') {
  // Configuración de la base de datos
  sequelize = new Sequelize({
    dialect: 'mysql', // o 'postgres', 'sqlite', etc.
    host: DB_HOST,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'control_db',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',

    // Configuraciones adicionales
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // Configuración de logging
    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    // Configuración de zona horaria
    timezone: '-06:00', // Ajustar según tu zona horaria

    // Configuraciones de definición
    define: {
      underscored: false,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
  });

  console.log('📁 Sequelize inicializado: conexión configurada con', DB_HOST);
} else {
  console.log('📁 No hay configuración de BD (DB_HOST). Sequelize no será inicializado. Usando DB JSON local.');
}

// Función para probar la conexión (no hace nada si sequelize no está)
const testConnection = async () => {
  if (!sequelize) {
    console.log('ℹ️ testConnection: Sequelize no inicializado, omitiendo prueba.');
    return;
  }
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};

// Función para sincronizar modelos (no hace nada si sequelize no está)
const syncDatabase = async (force = false) => {
  if (!sequelize) {
    console.log('ℹ️ syncDatabase: Sequelize no inicializado, omitiendo sincronización.');
    return;
  }
  try {
    await sequelize.sync({ force });
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
};

module.exports = sequelize;
module.exports.testConnection = testConnection;
module.exports.syncDatabase = syncDatabase;