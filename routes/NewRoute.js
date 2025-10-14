const express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/NewController');

const api = express.Router();

/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Obtiene todas las noticias con sus relaciones completas
 *     tags: [Noticias]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Filtrar por título de la noticia
 *         example: tecnología
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado activo
 *         example: true
 *     responses:
 *       200:
 *         description: Lista de noticias obtenida exitosamente (incluye categoría, estado y usuario con perfil)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/New'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get('/noticias', get);

/**
 * @swagger
 * /api/noticias/{id}:
 *   get:
 *     summary: Obtiene una noticia por ID con todas sus relaciones
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la noticia
 *         example: 1
 *     responses:
 *       200:
 *         description: Noticia encontrada (incluye categoría, estado y usuario con perfil)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
 *       404:
 *         description: Noticia no encontrada
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
api.get('/noticias/:id', getById)

/**
 * @swagger
 * /api/noticias:
 *   post:
 *     summary: Crea una nueva noticia
 *     tags: [Noticias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewInput'
 *           example:
 *             categoria_id: 1
 *             estado_id: 1
 *             usuario_id: 1
 *             titulo: "Avances en inteligencia artificial"
 *             contenido: "Los últimos desarrollos en IA están revolucionando la industria tecnológica. Nuevos algoritmos de machine learning permiten..."
 *             resumen: "Resumen de los avances más importantes en inteligencia artificial"
 *             activo: true
 *             fechapublicacion: "2024-01-25T16:00:00Z"
 *             useralta: "editor"
 *     responses:
 *       201:
 *         description: Noticia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/New'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.post('/noticias', create)

/**
 * @swagger
 * /api/noticias/{id}:
 *   put:
 *     summary: Actualiza una noticia existente
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la noticia a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewInput'
 *           example:
 *             titulo: "Avances revolucionarios en IA - Actualizado"
 *             contenido: "Contenido actualizado con los últimos desarrollos..."
 *             resumen: "Resumen actualizado de los avances"
 *             activo: true
 *             fechapublicacion: "2024-01-26T10:00:00Z"
 *     responses:
 *       200:
 *         description: Noticia actualizada exitosamente
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
api.put('/noticias/:id', update)

/**
 * @swagger
 * /api/noticias/{id}:
 *   delete:
 *     summary: Elimina una noticia
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la noticia a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Noticia eliminada exitosamente
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
api.delete('/noticias/:id', destroy)

module.exports = api;