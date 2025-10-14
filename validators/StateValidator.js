const { body } = require('express-validator');

// Validaciones requeridas para crear un nuevo estado
const validatorStateRequire = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
    
  body('abreviacion')
    .notEmpty()
    .withMessage('La abreviación es requerida')
    .isLength({ min: 1, max: 10 })
    .withMessage('La abreviación debe tener entre 1 y 10 caracteres')
    .matches(/^[A-Z]{1,10}$/)
    .withMessage('La abreviación debe contener solo letras mayúsculas'),
    
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('El campo activo debe ser verdadero o falso'),
    
  body('useralta')
    .optional()
    .isLength({ max: 50 })
    .withMessage('El campo useralta no puede exceder 50 caracteres')
];

// Validaciones opcionales para actualizar un estado existente
const validatorStateOptional = [
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
    
  body('abreviacion')
    .optional()
    .isLength({ min: 1, max: 10 })
    .withMessage('La abreviación debe tener entre 1 y 10 caracteres')
    .matches(/^[A-Z]{1,10}$/)
    .withMessage('La abreviación debe contener solo letras mayúsculas'),
    
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('El campo activo debe ser verdadero o falso'),
    
  body('useralta')
    .optional()
    .isLength({ max: 50 })
    .withMessage('El campo useralta no puede exceder 50 caracteres')
];

module.exports = {
  validatorStateRequire,
  validatorStateOptional
};