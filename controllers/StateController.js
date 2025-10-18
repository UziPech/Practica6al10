const { State } = require('../models/StateModel')
const { validationResult } = require('express-validator');
const db = require('../services/JSONDatabase');

const get = (request, response) => {
  const { nombre, abreviacion } = request.query
  const filters = {};

  if (nombre) {
    filters.nombre = nombre;
  }
  
  if (abreviacion) {
    filters.abreviacion = abreviacion;
  }

  State.findAll({
    where: filters
  })
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
        console.warn('Sequelize error en State.findAll, usando JSON fallback:', err.message);
        // Fallback: leer desde DB JSON
        const items = db.findAll('states', filters);
        response.json(items);
    })
}

const getById = (request, response) => {
  const id = request.params.id;
  State.findByPk(id)
    .then(entitie => {
      if (entitie) {
        response.json(entitie);
      }
      else {
        response.status(404).send('Recurso no encontrado')
      }
    })
    .catch(err => {
      console.warn('Sequelize error en State.findByPk, usando JSON fallback:', err.message);
      const item = db.findById('states', id);
      if (item) response.json(item);
      else response.status(404).send('Recurso no encontrado');
    })
}

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const { formatValidationResult } = require('../utils/validation');
    return response.status(422).json(formatValidationResult(errors));
  }
  
  State.create(request.body).then(
    newEntitie => {
      response.status(201).json(newEntitie)
    }
  )
    .catch(err => {
      console.warn('Sequelize error en State.create, usando JSON fallback:', err.message);
      // Fallback: crear en DB JSON
      const created = db.create('states', request.body);
      if (created) response.status(201).json(created);
      else response.status(500).send('Error al crear (fallback)');
    })
}

const update = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const { formatValidationResult } = require('../utils/validation');
    return response.status(422).json(formatValidationResult(errors));
  }
  
  const id = request.params.id;
  State.update(
    request.body, 
    {
      where: {
        id: id
      }
    })
    .then(numRowsUpdated => {
      response.status(200).send(`${numRowsUpdated} registro actualizado`);
    })
    .catch(err => {
      console.warn('Sequelize error en State.update, usando JSON fallback:', err.message);
      const updated = db.update('states', id, request.body);
      if (updated) response.status(200).send(`1 registro actualizado`);
      else response.status(500).send('Error al actualizar (fallback)');
    });
}

const destroy = (request, response) => {
  const id = request.params.id;
  State.destroy(
    {
      where: {
        id: id
      }
    }
  ).then(numRowsDeleted => {
    response.status(200).send(`${numRowsDeleted} registro eliminado`);
  })
    .catch(err => {
      console.warn('Sequelize error en State.destroy, usando JSON fallback:', err.message);
      const deleted = db.delete('states', id);
      if (deleted) response.status(200).send(`1 registro eliminado`);
      else response.status(500).send('Error al eliminar (fallback)');
    });
}

module.exports = {
  get,
  getById,
  create,
  update,
  destroy
};