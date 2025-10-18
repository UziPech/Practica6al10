const db = require('../services/JSONDatabase');

const { validationResult } = require('express-validator');

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
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }

    // Defensa: eliminar id si viene en el body y sanear strings
    if (request.body.id) delete request.body.id;
    if (request.body.nombre && typeof request.body.nombre === 'string') request.body.nombre = request.body.nombre.trim();
    if (request.body.descripcion && typeof request.body.descripcion === 'string') request.body.descripcion = request.body.descripcion.trim();

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
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }

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