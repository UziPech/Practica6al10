var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/UserController');
const api = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios con sus perfiles
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre del usuario
 *         example: Juan
 *       - in: query
 *         name: apellidos
 *         schema:
 *           type: string
 *         description: Filtrar por apellidos del usuario
 *         example: Pérez
 *       - in: query
 *         name: nick
 *         schema:
 *           type: string
 *         description: Filtrar por nickname del usuario
 *         example: jperez
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente (incluye perfil)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/usuarios', get);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID con su perfil
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado (incluye perfil)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/usuarios/:id', getById)

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             perfil_id: 2
 *             nick: "mrodriguez"
 *             nombre: "María"
 *             apellidos: "Rodríguez López"
 *             email: "maria.rodriguez@email.com"
 *             password: "securepass456"
 *             activo: true
 *             useralta: "admin"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.post('/usuarios', create)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             nombre: "Juan Carlos"
 *             apellidos: "Pérez García"
 *             email: "juancarlos.perez@email.com"
 *             activo: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "1 registro actualizado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.put('/usuarios/:id', update)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "1 registro eliminado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.delete('/usuarios/:id', destroy)

module.exports = api;