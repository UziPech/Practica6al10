const { New } = require('../models/NewModel')
const { Category } = require('../models/CategoryModel')
const { State } = require('../models/StateModel')
const { User } = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')
const db = require('../services/JSONDatabase')

const relationsUser = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
]

const relations = [
    { model: Category, attributes: ['id', 'nombre', 'descripcion'], as: 'categoria' },
    { model: State, attributes: ['id', 'nombre', 'abreviacion'], as: 'estado' },
    { model: User, attributes: ['id', 'perfil_id', 'nick', 'nombre'], as: 'usuario', include: relationsUser }
]

const { validationResult } = require('express-validator');

const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
        where: filters,
        include: relations
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.warn('Sequelize error en New.findAll, usando JSON fallback:', err.message);
            // Fallback: buscar en JSON DB y mapear relaciones mínimas
            const items = db.findAllWithRelations('news', filters, [
                { relation: 'categoria' },
                { relation: 'estado' },
                { relation: 'usuario' }
            ]);
            response.json(items);
        })
}

const getById = (request, response) => {
    const id = request.params.id;
    New.findByPk(id, {
        include: relations
    })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            console.warn('Sequelize error en New.findByPk, usando JSON fallback:', err.message);
            const item = db.findByIdWithRelations('news', id, [
                { relation: 'categoria' }, { relation: 'estado' }, { relation: 'usuario' }
            ]);
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

    New.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            console.warn('Sequelize error en New.create, usando JSON fallback:', err.message);
            const created = db.create('news', request.body);
            if (created) response.status(201).json(created);
            else response.status(500).send('Error al crear');
        })
}

const update = (request, response) => {
    const id = request.params.id;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const { formatValidationResult } = require('../utils/validation');
            return response.status(422).json(formatValidationResult(errors));
        }

    New.update(
        request.body, {
            where: {
                id: id
            }
        }
    )
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        })
        .catch(err => {
            console.warn('Sequelize error en New.update, usando JSON fallback:', err.message);
            const updated = db.update('news', id, request.body);
            if (updated) response.status(200).send(`1 registro actualizado`);
            else response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({
        where: {
            id: id
        }
    })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        })
        .catch(err => {
            console.warn('Sequelize error en New.destroy, usando JSON fallback:', err.message);
            const deleted = db.delete('news', id);
            if (deleted) response.status(200).send(`1 registro eliminado`);
            else response.status(500).send('Error al eliminar');
        });
}

module.exports = { get, getById, create, update, destroy };