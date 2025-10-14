const db = require('../services/JSONDatabase');

const get = (request, response) => {
  try {
    const { nombre, descripcion, activo, useralta } = request.query;
    const filters = {};
    
    if (nombre) filters.nombre = nombre;
    if (descripcion) filters.descripcion = descripcion;
    if (activo !== undefined) filters.activo = activo === 'true';
    if (useralta) filters.useralta = useralta;

    const categories = db.findAll('categories', filters);
    response.json(categories);
  } catch (err) {
    console.log(err);
    response.status(500).send('Error consultando los datos');
  }
};
  
const getById = (request, response) => {
  try {
    const id = request.params.id;
    const category = db.findById('categories', id);

    if (category) {
      response.json(category);
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al consultar el dato');
  }
};
  
const create = (request, response) => {
  try {
    const newCategory = db.create('categories', request.body);
    
    if (newCategory) {
      response.status(201).json(newCategory);
    } else {
      response.status(500).send('Error al crear');
    }
  } catch (err) {
    response.status(500).send('Error al crear');
  }
};
  
const update = (request, response) => {
  try {
    const id = request.params.id;
    const rowsUpdated = db.update('categories', id, request.body);
    
    response.status(200).send(`${rowsUpdated} registro actualizado`);
  } catch (err) {
    response.status(500).send('Error al actualizar');
  }
};

const destroy = (request, response) => {
  try {
    const id = request.params.id;
    const rowsDeleted = db.delete('categories', id);
    
    response.status(200).send(`${rowsDeleted} registro eliminado`);
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