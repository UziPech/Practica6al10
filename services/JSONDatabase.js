const fs = require('fs');
const path = require('path');

class JSONDatabase {
  constructor() {
    this.dbPath = path.join(__dirname, '../data/database.json');
    this.data = null; // lazy loaded
    this._loaded = false;
  }

  // Cargar datos solo cuando sea necesario (evita I/O en import)
  _ensureLoaded() {
    if (this._loaded) return;
    try {
      const rawData = fs.readFileSync(this.dbPath, 'utf8');
      this.data = JSON.parse(rawData);
      this._loaded = true;
    } catch (error) {
      console.warn('Warning: could not load database file, using in-memory fallback. Error:', error.message || error);
      this.data = {
        profiles: [],
        categories: [],
        states: [],
        users: [],
        news: [],
        counters: {
          profiles: 1,
          categories: 1,
          states: 1,
          users: 1,
          news: 1
        }
      };
      this._loaded = true;
    }
  }

  saveData() {
    // En entornos serverless (Vercel) el filesystem es efímero; evitar fallos silenciosos
    const runningOnVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
    const disableFileDb = process.env.DISABLE_FILE_DB === '1' || process.env.DISABLE_FILE_DB === 'true';
    if (runningOnVercel || disableFileDb) {
      console.warn('Skipping saveData() because running on serverless environment or DISABLE_FILE_DB=true');
      return true;
    }

    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving database:', error);
      return false;
    }
  }

  // Métodos genéricos para CRUD
  findAll(table, filters = {}) {
    this._ensureLoaded();
    let items = this.data[table] || [];
    
    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        items = items.filter(item => {
          if (typeof item[key] === 'string') {
            return item[key].toLowerCase().includes(filters[key].toLowerCase());
          }
          return item[key] == filters[key];
        });
      }
    });

    return items;
  }

  findById(table, id) {
    this._ensureLoaded();
    const items = this.data[table] || [];
    return items.find(item => item.id == id);
  }

  create(table, data) {
    this._ensureLoaded();
    if (!this.data[table]) {
      this.data[table] = [];
    }

    const newItem = {
      id: this.data.counters[table],
      ...data,
      fechaalta: new Date().toISOString()
    };

    this.data[table].push(newItem);
    this.data.counters[table]++;

    if (this.saveData()) {
      return newItem;
    }
    // Si no se pudo guardar, devolvemos objeto creado en memoria
    return newItem;
  }

  update(table, id, data) {
    this._ensureLoaded();
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id == id);
    
    if (index !== -1) {
      // Mantener id y fechaalta originales
      this.data[table][index] = {
        ...this.data[table][index],
        ...data,
        id: parseInt(id)
      };
      
      this.saveData();
      return 1;
    }
    return 0;
  }

  delete(table, id) {
    this._ensureLoaded();
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id == id);
    
    if (index !== -1) {
      this.data[table].splice(index, 1);
      this.saveData();
      return 1;
    }
    return 0;
  }

  // Métodos para consultas con relaciones
  findAllWithRelations(table, filters = {}, includes = []) {
    this._ensureLoaded();
    let items = this.findAll(table, filters);
    
    // Agregar relaciones
    items = items.map(item => {
      const itemWithRelations = { ...item };
      
      includes.forEach(include => {
        if (include.relation === 'perfil' && item.perfil_id) {
          itemWithRelations.perfil = this.findById('profiles', item.perfil_id);
        }
        if (include.relation === 'categoria' && item.categoria_id) {
          itemWithRelations.categoria = this.findById('categories', item.categoria_id);
        }
        if (include.relation === 'estado' && item.estado_id) {
          itemWithRelations.estado = this.findById('states', item.estado_id);
        }
        if (include.relation === 'usuario' && item.usuario_id) {
          const usuario = this.findById('users', item.usuario_id);
          if (usuario) {
            itemWithRelations.usuario = {
              ...usuario,
              perfil: this.findById('profiles', usuario.perfil_id)
            };
          }
        }
      });
      
      return itemWithRelations;
    });

    return items;
  }

  findByIdWithRelations(table, id, includes = []) {
    this._ensureLoaded();
    let item = this.findById(table, id);
    
    if (!item) return null;

    const itemWithRelations = { ...item };
    
    includes.forEach(include => {
      if (include.relation === 'perfil' && item.perfil_id) {
        itemWithRelations.perfil = this.findById('profiles', item.perfil_id);
      }
      if (include.relation === 'categoria' && item.categoria_id) {
        itemWithRelations.categoria = this.findById('categories', item.categoria_id);
      }
      if (include.relation === 'estado' && item.estado_id) {
        itemWithRelations.estado = this.findById('states', item.estado_id);
      }
      if (include.relation === 'usuario' && item.usuario_id) {
        const usuario = this.findById('users', item.usuario_id);
        if (usuario) {
          itemWithRelations.usuario = {
            ...usuario,
            perfil: this.findById('profiles', usuario.perfil_id)
          };
        }
      }
    });

    return itemWithRelations;
  }
}

// Crear instancia singleton
const db = new JSONDatabase();

module.exports = db;