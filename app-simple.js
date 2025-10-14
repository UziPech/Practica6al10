const express = require('express');
const cors = require('cors');
const { specs, swaggerUi } = require('./docs/swagger-ultra-simple');

const app = express();
const PORT = 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Base de datos en memoria (super simple)
let database = {
  profiles: [
    { id: 1, nombre: 'Administrador', descripcion: 'Perfil admin', activo: true },
    { id: 2, nombre: 'Editor', descripcion: 'Perfil editor', activo: true },
    { id: 3, nombre: 'Usuario', descripcion: 'Perfil usuario', activo: true }
  ],
  categories: [
    { id: 1, nombre: 'Tecnología', descripcion: 'Noticias tech', activo: true },
    { id: 2, nombre: 'Deportes', descripcion: 'Noticias deportivas', activo: true },
    { id: 3, nombre: 'Política', descripción: 'Noticias políticas', activo: true }
  ]
};

let nextId = { profiles: 4, categories: 4 };

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Control funcionando perfectamente',
    documentation: '/api-docs',
    endpoints: {
      perfiles: '/api/perfiles',
      categorias: '/api/categorias'
    }
  });
});

// ========== RUTAS PERFILES ==========

// GET /api/perfiles
app.get('/api/perfiles', (req, res) => {
  try {
    const { nombre } = req.query;
    let result = database.profiles;
    
    if (nombre) {
      result = result.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/perfiles/:id
app.get('/api/perfiles/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profile = database.profiles.find(p => p.id === id);
    
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/perfiles
app.post('/api/perfiles', (req, res) => {
  try {
    const newProfile = {
      id: nextId.profiles++,
      nombre: req.body.nombre || 'Sin nombre',
      descripcion: req.body.descripcion || 'Sin descripción',
      activo: req.body.activo !== undefined ? req.body.activo : true
    };
    
    database.profiles.push(newProfile);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/perfiles/:id
app.put('/api/perfiles/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profileIndex = database.profiles.findIndex(p => p.id === id);
    
    if (profileIndex !== -1) {
      database.profiles[profileIndex] = {
        ...database.profiles[profileIndex],
        ...req.body,
        id: id // Mantener el ID original
      };
      res.json({ message: '1 registro actualizado' });
    } else {
      res.status(404).json({ error: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/perfiles/:id
app.delete('/api/perfiles/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profileIndex = database.profiles.findIndex(p => p.id === id);
    
    if (profileIndex !== -1) {
      database.profiles.splice(profileIndex, 1);
      res.json({ message: '1 registro eliminado' });
    } else {
      res.status(404).json({ error: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ========== RUTAS CATEGORÍAS ==========

// GET /api/categorias
app.get('/api/categorias', (req, res) => {
  try {
    const { nombre } = req.query;
    let result = database.categories;
    
    if (nombre) {
      result = result.filter(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/categorias/:id
app.get('/api/categorias/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = database.categories.find(c => c.id === id);
    
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/categorias
app.post('/api/categorias', (req, res) => {
  try {
    const newCategory = {
      id: nextId.categories++,
      nombre: req.body.nombre || 'Sin nombre',
      descripcion: req.body.descripcion || 'Sin descripción',
      activo: req.body.activo !== undefined ? req.body.activo : true
    };
    
    database.categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/categorias/:id
app.put('/api/categorias/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoryIndex = database.categories.findIndex(c => c.id === id);
    
    if (categoryIndex !== -1) {
      database.categories[categoryIndex] = {
        ...database.categories[categoryIndex],
        ...req.body,
        id: id // Mantener el ID original
      };
      res.json({ message: '1 registro actualizado' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/categorias/:id
app.delete('/api/categorias/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoryIndex = database.categories.findIndex(c => c.id === id);
    
    if (categoryIndex !== -1) {
      database.categories.splice(categoryIndex, 1);
      res.json({ message: '1 registro eliminado' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para endpoints no encontrados
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    availableEndpoints: ['/api/perfiles', '/api/categorias']
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌟 Servidor funcionando en el puerto ${PORT}`);
  console.log(`📱 API: http://localhost:${PORT}`);
  console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
  console.log('✅ TODO FUNCIONANDO PERFECTAMENTE');
});

module.exports = app;