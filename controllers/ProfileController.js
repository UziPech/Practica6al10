const db = require('../services/JSONDatabase');

const { validationResult } = require('express-validator');

const get = (request, response) => {
  try {
    const { nombre } = request.query;
    const filters = {};
    
    if (nombre) filters.nombre = nombre;

    const profiles = db.findAll('profiles', filters);
    response.json(profiles);
  } catch (err) {
    console.log(err);
    response.status(500).send('Error consultando los datos');
  }
};

const getById = (request, response) => {
  try {
    const id = request.params.id;
    const profile = db.findById('profiles', id);
    
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
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }

    const newProfile = db.create('profiles', request.body);
    
    if (newProfile) {
      response.status(201).json(newProfile);
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
    const rowsUpdated = db.update('profiles', id, request.body);
    
    response.status(200).send(`${rowsUpdated} registro actualizado`);
  } catch (err) {
    response.status(500).send('Error al actualizar');
  }
};

const destroy = (request, response) => {
  try {
    const id = request.params.id;
    const rowsDeleted = db.delete('profiles', id);
    
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