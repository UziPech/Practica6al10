const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const db = require('../services/JSONDatabase');

const validatorUserCreate = [
  // No permitir que el cliente envíe un id (debe asignarse automáticamente)
  check('id').not().exists().withMessage('No envíe el campo id; se asignará automáticamente.'),
  check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
    .isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

  check('apellidos').notEmpty().withMessage('El campo apellido es obligatorio')
    .isString().withMessage('El campo apellido debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

  check('nick').notEmpty().withMessage('El campo nick es obligatorio')
    .isString().withMessage('El campo nick debe ser texto')
    .isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres')
    .custom((value) => {
      // Primero intentamos validar contra la base JSON para no depender de MySQL
      const users = db.findAll('users') || [];
      const exists = users.some(u => u.nick === value);
      if (exists) {
        throw new Error('Ya existe un usuario con el mismo nick');
      }
      // Como fallback podríamos intentar Sequelize, pero no exponemos errores de conexión
      return true;
    }),

  check('email').notEmpty().withMessage('El campo correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo valido')
    .custom((value) => {
      const users = db.findAll('users') || [];
      const exists = users.some(u => u.email === value);
      if (exists) {
        throw new Error('Ya existe un usuario con el mismo correo');
      }
      return true;
    }),

  check('password').notEmpty().withMessage('El campo contraseña es obligatorio')
    .isString().withMessage('El campo contraseña debe ser texto')
    .isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),

  check('perfil_id').notEmpty().withMessage('El campo perfil id es obligatorio')
    .isInt().withMessage('El campo perfil id debe ser numero')
    .custom((value) => {
      const profile = db.findById('profiles', value);
      if (!profile) {
        throw new Error('No existe un perfil con ese id');
      }
      return true;
    }),
];

const validatorUserUpdate = [
  check('nombre').optional().isString().withMessage('El campo nombre debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
  check('apellidos').optional().isString().withMessage('El campo apellido debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
  check('nick').optional().isString().withMessage('El campo nick debe ser texto')
    .isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),
  check('password').optional().isString().withMessage('El campo contraseña debe ser texto')
    .isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),
  check('perfil_id').optional().isInt().withMessage('El campo perfil id debe ser numero')
    .custom((value) => {
      const profile = db.findById('profiles', value);
      if (!profile) {
        throw new Error('No existe un perfil con ese id');
      }
      return true;
    }),
];

module.exports = {
  validatorUserCreate,
  validatorUserUpdate
};
