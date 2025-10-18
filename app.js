const express = require('express')
const cors = require('cors')
const { specs, swaggerUi } = require('./docs/swagger')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Capturar errores de parseo JSON (body inválido) y devolver 400 legible
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && (err.status === 400 || err.status === 400) && 'body' in err) {
    console.error('JSON parse error:', err.message);
    return res.status(400).json({ error: 'JSON inválido en el cuerpo de la petición', message: err.message });
  }
  next(err);
});

// Middleware para logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Importar todas las rutas (funcionan con base de datos JSON)
const profile_routes = require('./routes/ProfileRoute');
const state_routes = require('./routes/StateRoute');
const category_routes = require('./routes/CategoryRoute');
const new_routes = require('./routes/NewRoute');
const user_routes = require('./routes/UserRoute');
const auth_routes = require('./routes/AuthRoute');

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Control - Documentación",
  swaggerOptions: {
    docExpansion: 'none',
    tagsSorter: 'alpha',
    operationsSorter: 'alpha'
  }
}));

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Control - Servidor funcionando correctamente',
    version: '1.0.0',
    documentation: '/api-docs',
    database: '📁 Base de datos: JSON',
    endpoints: {
      perfiles: '/api/perfiles',
      categorias: '/api/categorias',
      noticias: '/api/noticias',
      estados: '/api/estados',
      usuarios: '/api/usuarios'
    }
  });
});

// Usar todas las rutas con el prefijo /api
app.use('/api', profile_routes);
app.use('/api', state_routes);
app.use('/api', category_routes);
app.use('/api', new_routes);
app.use('/api', user_routes);
app.use('/api', auth_routes);

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.originalUrl} no existe en esta API`,
    availableEndpoints: [
      'GET /api/perfiles',
      'GET /api/categorias',
      'GET /api/noticias',
      'GET /api/estados',
      'GET /api/usuarios'
    ]
  });
});

// Middleware global para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Función para inicializar el servidor
const startServer = async () => {
  try {
    console.log('📁 Usando base de datos JSON');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🌟 Servidor escuchando en el puerto ${PORT}`);
      console.log(`📱 API disponible en: http://localhost:${PORT}`);
      console.log(`📚 Documentación Swagger en: http://localhost:${PORT}/api-docs`);
      console.log(`🏠 Página principal en: http://localhost:${PORT}/`);
      console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log('');
      console.log('🎯 Para probar la API interactiva:');
      console.log(`   👉 Ve a: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al inicializar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales para cerrar gracefully
process.on('SIGTERM', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
});

// Inicializar servidor solo si no está siendo importado
if (require.main === module) {
  startServer();
}

module.exports = app;