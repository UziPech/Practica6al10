const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');
const db = require('../services/JSONDatabase');

const validatorNewCreate = [
  check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero')
    .custom((value) => {
      const cat = db.findById('categories', value);
      if (!cat || !cat.activo) {
        throw new Error('No existe una categoria con ese id');
      }
      return true;
    }),

  check('usuario_id').notEmpty().withMessage('El campo usuario_id es obligatorio').isInt().withMessage('El campo usuario_id debe ser un numero entero')
    .custom((value) => {
      const user = db.findById('users', value);
      if (!user || !user.activo) {
        throw new Error('No existe una usuario con ese id');
      }
      return true;
    }),

  check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero')
    .custom((value) => {
      const st = db.findById('states', value);
      if (!st || !st.activo) {
        throw new Error('No existe una estado con ese id');
      }
      return true;
    }),

  check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
  check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
  check('imagen').notEmpty().withMessage('El campo imagen es obligatorio').isBase64().withMessage('El campo imagen debe ser un Base 64'),
  check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

const validatorNewUpdate = [
  check('categoria_id').optional().isInt().withMessage('El campo categoria_id debe ser un numero entero')
    .custom((value) => {
      const cat = db.findById('categories', value);
      if (!cat || !cat.activo) {
        throw new Error('No existe una categoria con ese id');
      }
      return true;
    }),
  check('usuario_id').optional().isInt().withMessage('El campo usuario_id debe ser un numero entero')
    .custom((value) => {
      const user = db.findById('users', value);
      if (!user || !user.activo) {
        throw new Error('No existe una usuario con ese id');
      }
      return true;
    }),
  check('estado_id').optional().isInt().withMessage('El campo estado_id debe ser un numero entero')
    .custom((value) => {
      const st = db.findById('states', value);
      if (!st || !st.activo) {
        throw new Error('No existe una estado con ese id');
      }
      return true;
    }),

  check('titulo').optional().isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
  check('descripcion').optional().isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
  check('imagen').optional().isBase64().withMessage('El campo imagen debe ser un Base 64'),
  check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

module.exports = {
  validatorNewCreate,
  validatorNewUpdate
};
