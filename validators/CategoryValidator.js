const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const db = require('../services/JSONDatabase');

const validatorCategoryCreate = [
  check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
    .trim()
    .isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 3, max: 50 }).withMessage('El campo debe tener entre 3 y 50 caracteres')
    .custom((value) => {
      const exists = db.findAll('categories').some(c => c.nombre === value);
      if (exists) {
        throw new Error('Ya existe una categoría con el mismo nombre');
      }
      return true;
    }),

  check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio')
    .trim()
    .isString().withMessage('El campo descripcion debe ser texto')
    .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres'),

  check('activo').optional().isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

const validatorCategoryUpdate = [
  check('nombre').optional()
    .isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
    .custom((value) => {
      const exists = db.findAll('categories').some(c => c.nombre === value);
      if (exists) {
        throw new Error('Ya existe una categoría con el mismo nombre');
      }
      return true;
    }),

  check('descripcion').optional()
    .isString().withMessage('El campo descripcion debe ser texto')
    .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres'),

  check('activo').optional().isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

module.exports = {
  validatorCategoryCreate,
  validatorCategoryUpdate
};
