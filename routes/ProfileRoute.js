var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/ProfileController');
const { validatorProfileCreate, validatorProfileUpdate } = require('../validators/ProfileValidator');
const api = express.Router();

/**
 * @swagger
 * /api/perfiles:
 *   get:
 *     summary: Obtiene todos los perfiles
 *     tags: [Perfiles]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre del perfil
 *         example: Administrador
 *     responses:
 *       200:
 *         description: Lista de perfiles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/perfiles', get);

/**
 * @swagger
 * /api/perfiles/{id}:
 *   get:
 *     summary: Obtiene un perfil por ID
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil
 *         example: 1
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Perfil no encontrado
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
api.get('/perfiles/:id', getById)

/**
 * @swagger
 * /api/perfiles:
 *   post:
 *     summary: Crea un nuevo perfil
 *     tags: [Perfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *           example:
 *             nombre: "Editor"
 *             descripcion: "Perfil para editores de contenido"
 *             activo: true
 *             useralta: "admin"
 *     responses:
 *       201:
 *         description: Perfil creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.post('/perfiles', validatorProfileCreate, create)

/**
 * @swagger
 * /api/perfiles/{id}:
 *   put:
 *     summary: Actualiza un perfil existente
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *           example:
 *             nombre: "Super Administrador"
 *             descripcion: "Perfil con acceso total actualizado"
 *             activo: true
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
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
api.put('/perfiles/:id', validatorProfileUpdate, update)

/**
 * @swagger
 * /api/perfiles/{id}:
 *   delete:
 *     summary: Elimina un perfil
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del perfil a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Perfil eliminado exitosamente
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
api.delete('/perfiles/:id', destroy)

module.exports = api;