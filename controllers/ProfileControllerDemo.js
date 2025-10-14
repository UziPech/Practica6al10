// Datos de demostración en memoria
let profiles = [
  { id: 1, nombre: 'Administrador', descripcion: 'Perfil con acceso total', activo: true, fechaalta: new Date(), useralta: 'system' },
  { id: 2, nombre: 'Editor', descripcion: 'Perfil para editores', activo: true, fechaalta: new Date(), useralta: 'admin' },
  { id: 3, nombre: 'Usuario', descripcion: 'Perfil básico', activo: true, fechaalta: new Date(), useralta: 'admin' }
];

let nextId = 4;

const get = (request, response) => {
  try {
    const { nombre } = request.query;
    let filteredProfiles = profiles;

    if (nombre) {
      filteredProfiles = profiles.filter(p => 
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    }

    response.json(filteredProfiles);
  } catch (err) {
    console.log(err);
    response.status(500).send('Error consultando los datos');
  }
};

const getById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const profile = profiles.find(p => p.id === id);
    
    if (profile) {
      response.json(profile);
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al consultar el dato');
  }
};

const create = (request, response) => {
  try {
    const newProfile = {
      id: nextId++,
      ...request.body,
      fechaalta: new Date()
    };
    
    profiles.push(newProfile);
    response.status(201).json(newProfile);
  } catch (err) {
    response.status(500).send('Error al crear');
  }
};

const update = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const profileIndex = profiles.findIndex(p => p.id === id);
    
    if (profileIndex !== -1) {
      profiles[profileIndex] = { ...profiles[profileIndex], ...request.body };
      response.status(200).send('1 registro actualizado');
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al actualizar');
  }
};

const destroy = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const profileIndex = profiles.findIndex(p => p.id === id);
    
    if (profileIndex !== -1) {
      profiles.splice(profileIndex, 1);
      response.status(200).send('1 registro eliminado');
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al eliminar');
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  destroy
};