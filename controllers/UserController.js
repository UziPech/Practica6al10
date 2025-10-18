const { User } = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')
const db = require('../services/JSONDatabase');

const relations = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
]

const { validationResult } = require('express-validator');

const get = (request, response) => {
    const { nombre, apellidos, nick } = request.query
    const filters = {}

    if (nombre) {
        filters.nombre = nombre
    }
    if (apellidos) {
        filters.apellidos = apellidos
    }
    if (nick) {
        filters.nick = nick
    }

    User.findAll({
        where: filters,
        include: relations
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.warn('Sequelize error en User.findAll, usando JSON fallback:', err.message);
            const items = db.findAllWithRelations('users', filters, [{ relation: 'perfil' }]);
            response.json(items);
        })
}

const getById = (request, response) => {
    const id = request.params.id;
    User.findByPk(id, {
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
            console.warn('Sequelize error en User.findByPk, usando JSON fallback:', err.message);
            const item = db.findByIdWithRelations('users', id, [{ relation: 'perfil' }]);
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

    // Hashear password si viene en el request
    const createUser = async () => {
        try {
            // Defenderse contra body malicioso: eliminar id si se envía
            if (request.body.id) {
                delete request.body.id;
            }
            if (request.body.password) {
                const bcrypt = require('bcryptjs');
                request.body.password = await bcrypt.hash(request.body.password, 10);
            }
            const newEntitie = await User.create(request.body);
            response.status(201).json(newEntitie);
        } catch (err) {
            console.warn('Sequelize error en User.create, intentando fallback JSON:', err.message);
            const created = db.create('users', request.body);
            if (created) response.status(201).json(created);
            else response.status(500).send('Error al crear');
        }
    }

    createUser();
}

const update = (request, response) => {
    const id = request.params.id;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const { formatValidationResult } = require('../utils/validation');
            return response.status(422).json(formatValidationResult(errors));
        }

    User.update(
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
            response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    User.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(numRowsDeleted => {
        response.status(200).send(`${numRowsDeleted} registro eliminado`);
    })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
}

module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};