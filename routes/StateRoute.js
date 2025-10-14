var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/StateController');
const { validatorStateRequire, validatorStateOptional } = require('../validators/StateValidator')
const api = express.Router();

/**
 * @swagger
 * /api/estados:
 *   get:
 *     summary: Obtiene todos los estados
 *     tags: [Estados]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre del estado
 *         example: Jalisco
 *       - in: query
 *         name: abreviacion
 *         schema:
 *           type: string
 *         description: Filtrar por abreviación del estado
 *         example: JAL
 *     responses:
 *       200:
 *         description: Lista de estados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/estados', get);

/**
 * @swagger
 * /api/estados/{id}:
 *   get:
 *     summary: Obtiene un estado por ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: Estado no encontrado
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
api.get('/estados/:id', getById)

/**
 * @swagger
 * /api/estados:
 *   post:
 *     summary: Crea un nuevo estado (con validaciones)
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StateInput'
 *           example:
 *             nombre: "Nuevo León"
 *             abreviacion: "NL"
 *             activo: true
 *             useralta: "admin"
 *     responses:
 *       201:
 *         description: Estado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       422:
 *         description: Errores de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               errors:
 *                 nombre:
 *                   msg: "El nombre debe tener entre 2 y 100 caracteres"
 *                   param: "nombre"
 *                   location: "body"
 *                 abreviacion:
 *                   msg: "La abreviación debe contener solo letras mayúsculas"
 *                   param: "abreviacion"
 *                   location: "body"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.post('/estados', validatorStateRequire, create)

/**
 * @swagger
 * /api/estados/{id}:
 *   put:
 *     summary: Actualiza un estado existente (con validaciones)
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StateInput'
 *           example:
 *             nombre: "Jalisco Actualizado"
 *             abreviacion: "JAL"
 *             activo: false
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "1 registro actualizado"
 *       422:
 *         description: Errores de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.put('/estados/:id', validatorStateOptional, update)

/**
 * @swagger
 * /api/estados/{id}:
 *   delete:
 *     summary: Elimina un estado
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado eliminado exitosamente
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
api.delete('/estados/:id', destroy)

module.exports = api;