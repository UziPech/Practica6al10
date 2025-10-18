const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../services/JSONDatabase');

const LOGIN_SECRET = process.env.JWT_SECRET || 'mi_llave_secreta';

const login = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const { formatValidationResult } = require('../utils/validation');
            return response.status(422).json(formatValidationResult(errors));
        }


        // Intentar obtener usuario desde Sequelize (MySQL)
        let usuario = null;
        try {
            usuario = await User.findOne({
                where: { email: request.body.email },
                attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick', 'password', 'activo']
            });
        } catch (err) {
            // Si ocurre un error con Sequelize (p.ej. DB no disponible), usaremos la base JSON como fallback
            console.warn('Sequelize error en login, usando JSON DB fallback:', err.message);
        }

        // Si no hay usuario vía Sequelize, buscar en la base JSON
        if (!usuario) {
            const users = db.findAll('users') || [];
            const found = users.find(u => u.email === request.body.email);
            if (found) {
                // Normalizar objeto a formato similar al modelo Sequelize
                usuario = {
                    id: found.id,
                    perfil_id: found.perfil_id,
                    nombre: found.nombre,
                    apellidos: found.apellidos,
                    nick: found.nick,
                    password: found.password,
                    activo: found.activo,
                    // método update compatible con el uso anterior (simular)
                    update: async (data) => {
                        return db.update('users', found.id, data);
                    }
                };
            }
        }

        if (!usuario) {
            return response.status(401).json({ message: 'Credenciales inválidas o usuario no encontrado' });
        }

        if (!usuario.activo) {
            return response.status(403).json({ message: 'Cuenta inactiva. Contacta al administrador.' });
        }

        const stored = usuario.password || '';
        let passwordMatches = false;

        // Si la contraseña almacenada parece ser un hash bcrypt (comienza con $2), usar compare
        if (stored.startsWith('$2')) {
            passwordMatches = await bcrypt.compare(request.body.password, stored);
        } else {
            // Comparación legacy: texto plano
            passwordMatches = (stored === request.body.password);
            // Si coincide y es texto plano, migramos al hash para mejorar seguridad
            if (passwordMatches) {
                const newHash = await bcrypt.hash(request.body.password, 10);
                // Actualizar la contraseña de forma asíncrona (no bloqueante)
                usuario.update({ password: newHash }).catch(err => console.error('Error migrando password:', err));
            }
        }

        if (!passwordMatches) {
            return response.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payloadUser = {
            id: usuario.id,
            perfil_id: usuario.perfil_id,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            nick: usuario.nick
        };

        const token = jwt.sign({ usuario: payloadUser }, LOGIN_SECRET, { expiresIn: '24h' });
        return response.status(200).json({ message: 'Login con éxito', token });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: 'Error interno al procesar login' });
    }
}

const register = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const { formatValidationResult } = require('../utils/validation');
            return response.status(422).json(formatValidationResult(errors));
        }

        request.body.perfil_id = 2;
        request.body.activo = true;

        // Hashear la contraseña antes de crear el usuario
        if (request.body.password) {
            const hashed = await bcrypt.hash(request.body.password, 10);
            request.body.password = hashed;
        }

        const newEntitie = await User.create(request.body);
        return response.status(201).json(newEntitie);
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: 'Error al crear el usuario' });
    }
}

module.exports = {
    login,
    register,
};
