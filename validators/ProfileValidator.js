const { check } = require('express-validator');
const { Profile } = require('../models/ProfileModel');
const db = require('../services/JSONDatabase');

const validatorProfileCreate = [
  check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
    .isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres')
    .custom((value) => {
      // Validar contra base JSON primero
      const exists = db.findAll('profiles').some(p => p.nombre === value);
      if (exists) {
        throw new Error('Ya existe un perfil con el mismo nombre');
      }
      // Fallback a Sequelize (no obligatorio)
      return true;
    }),
  check('descripcion').optional().isString().withMessage('El campo descripcion debe ser texto')
    .isLength({ min: 2 }).withMessage('La descripcion debe tener al menos 2 caracteres')
];

const validatorProfileUpdate = [
  check('nombre').optional().isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres')
    .custom((value) => {
      const exists = db.findAll('profiles').some(p => p.nombre === value);
      if (exists) {
        throw new Error('Ya existe un perfil con el mismo nombre');
      }
      return true;
    }),
  check('descripcion').optional().isString().withMessage('El campo descripcion debe ser texto')
    .isLength({ min: 2 }).withMessage('La descripcion debe tener al menos 2 caracteres')
];

module.exports = {
  validatorProfileCreate,
  validatorProfileUpdate
};
