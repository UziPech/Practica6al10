var express = require('express');

// Usar controladores demo que funcionan sin base de datos
const { get, getById, create, update, destroy } = require('../controllers/CategoryControllerDemo');
const api = express.Router();

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías (DEMO - Sin BD)
 *     tags: [Categorías]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de la categoría
 *         example: Tecnología
 *       - in: query
 *         name: descripcion
 *         schema:
 *           type: string
 *         description: Filtrar por descripción
 *         example: tecnología
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado activo
 *         example: true
 *       - in: query
 *         name: useralta
 *         schema:
 *           type: string
 *         description: Filtrar por usuario creador
 *         example: admin
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/categorias', get);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID (DEMO - Sin BD)
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
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
api.get('/categorias/:id', getById)

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crea una nueva categoría (DEMO - Sin BD)
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *           example:
 *             nombre: "Ciencia"
 *             descripcion: "Noticias científicas y descubrimientos"
 *             activo: true
 *             useralta: "admin"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.post('/categorias', create)

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría existente (DEMO - Sin BD)
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *           example:
 *             nombre: "Tecnología Avanzada"
 *             descripcion: "Últimas innovaciones tecnológicas"
 *             activo: true
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
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
api.put('/categorias/:id', update)

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría (DEMO - Sin BD)
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
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
api.delete('/categorias/:id', destroy)

module.exports = api;