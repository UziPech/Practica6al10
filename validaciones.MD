En el contexto de una API , las validaciones se refieren a los procesos y reglas utilizados para garantizar que los datos enviados a través de la API cumplan con ciertos criterios antes de ser aceptados o procesados por el servidor.

Las validaciones son fundamentales para mantener la integridad y la consistencia de los datos en una API. Ayudan a prevenir errores, garantizar la calidad de los datos y mejorar la seguridad. Al aplicar validaciones, se pueden detectar y rechazar datos incorrectos, incompletos o mal formateados antes de que afecten las operaciones y funcionalidades del sistema.

Existen diferentes tipos de validaciones que se pueden realizar en una API, entre las cuales se incluyen:

1. `Validaciones de formato:` Verifican que los datos cumplan con un formato específico. Por ejemplo, se puede validar que un campo de fecha tenga el formato "dd/mm/aaaa" o que un campo numérico solo contenga dígitos.
2. `Validaciones de longitud:` Comprueban que los datos no excedan un tamaño máximo o mínimo permitido. Esto se aplica a campos de texto, arreglos u otros tipos de datos.
3. `Validaciones de tipo de dato:` Aseguran que los datos sean del tipo esperado. Por ejemplo, se puede verificar que un campo numérico sea un entero o un valor decimal.
4. `Validaciones de unicidad:` Verifican que los datos no se repitan o ya existan en el sistema. Esto se utiliza comúnmente en identificadores únicos, como números de identificación o direcciones de correo electrónico.
5. `Validaciones de reglas de negocio:` Implementan reglas específicas del dominio del negocio para asegurar que los datos cumplan con requisitos específicos. Por ejemplo, se pueden validar restricciones como "el monto de una transacción no puede ser negativo" o "un usuario debe tener al menos 18 años".
6. `Validaciones personalizadas:` Permiten definir reglas de validación específicas según las necesidades del sistema. Estas validaciones pueden ser desarrolladas por los propios desarrolladores de la API y se adaptan a los requisitos particulares del proyecto.

Las validaciones en una API se suelen realizar tanto en el lado del cliente como en el lado del servidor. En el lado del cliente, se pueden aplicar validaciones básicas para garantizar que los datos enviados a la API cumplan con ciertos criterios antes de realizar la solicitud. Sin embargo, estas validaciones en el cliente no deben considerarse como una medida de seguridad completa, ya que los datos aún pueden ser modificados antes de llegar al servidor. Por lo tanto, es crucial realizar validaciones adicionales en el lado del servidor para garantizar la integridad y seguridad de los datos recibidos.

## 7.1 Express Validator

Express Validator es una biblioteca de validación de middleware para el Express. Proporciona una forma sencilla y flexible de validar y sanitizar los datos de entrada en las solicitudes HTTP antes de que sean procesados por el servidor.

Express Validator ofrece una amplia gama de funciones de validación predefinidas para verificar campos comunes, como cadenas de texto, números, fechas, direcciones de correo electrónico, URL, entre otros. Además, permite crear validaciones personalizadas para adaptarse a las necesidades específicas de una aplicación.

Algunas características y funcionalidades clave de Express Validator son:

1. `Validación de campos:` Permite definir reglas de validación para campos específicos en una solicitud, como la longitud mínima y máxima de una cadena, formato de fecha, formato de correo electrónico válido, entre otros.
2. `Sanitización de datos:`Además de validar los datos de entrada, Express Validator también ofrece funciones para sanear o limpiar los datos. Esto ayuda a prevenir ataques de inyección de código y a garantizar que los datos estén en un formato seguro antes de ser utilizados.
3. `Validación en cadena:`Express Validator permite encadenar múltiples validaciones y reglas para un campo determinado. Esto facilita la aplicación de reglas de validación complejas y proporciona flexibilidad en la definición de requisitos específicos para los datos de entrada.
4. `Gestión de errores:` Cuando una validación falla, Express Validator facilita la captura de los errores y su posterior manejo. Puede proporcionar mensajes de error personalizados para cada campo o utilizar mensajes predefinidos.
5. `Integración con Express:` Express Validator se integra fácilmente con el framework Express. Se puede utilizar como middleware en las rutas de Express para validar y sanear automáticamente los datos antes de que sean procesados por las rutas correspondientes.
6. `Soporte para diferentes formatos de datos:` Express Validator puede validar y sanear datos en diversos formatos, como JSON, formularios URL-encoded, formularios multipartes, entre otros.

### 7.1.2 Express Validator - Check

La función **check** de Express Validator proporciona diversas opciones y funciones para definir reglas de validación y saneamiento de campos en una solicitud. A continuación, se describen las opciones más comunes que se pueden utilizar con el método **check**:

1. **`isEmpty`**: Permite verificar si un campo está vacío o no. Esta opción devuelve **true** si el campo está vacío y **false** en caso contrario.
2. **`isLength`**: Verifica la longitud de un campo de texto. Se puede utilizar para especificar una longitud mínima y/o máxima requerida para el campo.
3. **`isEmail`**: Valida si el campo es una dirección de correo electrónico válida.
4. **`isURL`**: Comprueba si el campo es una URL válida.
5. **`isNumeric`**: Verifica si el campo es un número.
6. **`isInt`**: Valida si el campo es un número entero.
7. **`isFloat`**: Comprueba si el campo es un número decimal.
8. **`isBoolean`**: Valida si el campo es un valor booleano.
9. **`isIn`**: Verifica si el valor del campo está dentro de una lista de valores permitidos.
10. **`equals`**: Comprueba si el valor del campo es igual a un valor específico.
11. **`matches`**: Valida si el valor del campo coincide con un patrón de expresión regular.
12. **`custom`**: Permite definir una función personalizada de validación para un campo específico. La función personalizada debe retornar **true** si la validación es exitosa y **false** en caso contrario.
13. `optional`: Verifica si el campo existe en la solicitud. Es útil para validar campos opcionales.
14. **`bail`**: Indica que se debe detener la validación después de que una validación falla en el campo actual. Esto evita que se realicen más validaciones en caso de que una validación falle.

Estas son algunas de las opciones más comunes que se pueden utilizar con el método **check** de Express Validator. Sin embargo, la biblioteca ofrece muchas más opciones y funciones para adaptarse a diferentes necesidades de validación y saneamiento de datos en una aplicación Express.

**Custom**

El método **`.custom()`** en Express Validator se utiliza para realizar validaciones personalizadas en un campo específico. Puedes utilizarlo para agregar lógica de validación personalizada en función del valor del campo y otros datos de la solicitud.

Aquí un ejemplo utilizando **`.custom()`** para verificar si ya existe un estado en la base de datos con el mismo nombre, utilizando los métodos que nos proporciona Sequelize. 

```jsx
.custom((value, { request }) => {
    return State.findOne({ where: { nombre: value } })
      .then((state) => {
        if (state) {
          throw new Error('Ya existe un estado con el mismo nombre');
        }
      });
  })
```

En este caso, el método **`.custom()`** recibe dos parámetros:

1. **`value`**: El valor del campo que se está validando. En este caso, **`value`** representa el valor del campo **`nombre`**.
2. **`options`**: Un objeto que contiene información adicional sobre la validación. En este caso, **`{ request }`** representa el objeto de solicitud de Express.

Dentro de la función personalizada, se utiliza **`State.findOne()`** para buscar un estado en la base de datos donde el nombre coincide con el valor del campo **`nombre`**. Si se encuentra un estado, se lanza un error utilizando **`throw new Error()`**.

El método **`.custom()`** puede devolver una promesa o un valor directamente. En este caso, se devuelve una promesa ya que **`State.findOne()`** devuelve una promesa que resuelve el estado encontrado. Si no se encuentra ningún estado, la promesa se resuelve sin devolver ningún valor.

Es importante tener en cuenta que cuando se lanza un error dentro de **`.custom()`**, se considera una validación fallida y se agrega un mensaje de error al objeto **`validationResult`**, que luego se puede manejar en el código que verifica los resultados de validación, como se mostró en la respuesta anterior.

## 7.2 Definiendo las validaciones de nuestra API

Paso 1: Para poder hacer uso de express validator debemos de instalar el paquete, para eso abrimos una terminal en la raíz de nuestro proyecto ApiNews y ejecutamos:

```powershell
npm install express-validator
```

Paso 2: Ahora vamos a crear en la raíz de nuestro proyecto una carpeta llamada `validators`

Paso 3: Dentro de esta carpeta vamos a crear un archivo que se llame `StateValidator.js`, y pegamos el siguiente código

```jsx
const { check } = require('express-validator');
const { State } = require('../models/StateModel');

const validatorStateRequire = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres')
                   .custom((value, {request}) => {
                        return State.findOne({ where: { nombre: value } })
                        .then((state) => {
                        if (state) {
                            throw new Error('Ya existe un estado con el mismo nombre');
                        }
                        });
                   }),

    check('abreviacion').notEmpty().withMessage('El campo abreviacion es obligatorio')
                        .isString().withMessage('El campo nombre debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres')
];

const validatorStateOptional = [
    check('nombre').optional()
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres'),

    check('abreviacion').optional()
                        .isString().withMessage('El campo nombre debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres'),
]
module.exports = {
    validatorStateRequire,
    validatorStateOptional
}
```

Paso 4: Nuestro archivo `StateRoute.js` debe quedar de la siguiente manera

```jsx
var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const {validatorStateRequire, validatorStateOptional} = require('../validators/StateValidator')
const api = express.Router();

api.get('/estados', get);
api.get('/estados/:id', getById)
api.post('/estados', validatorStateRequire, create)
api.put('/estados/:id', validatorStateOptional, update)
api.delete('/estados/:id', destroy)

module.exports = api;
```

Para poder hacer uso de las validaciones dentro de nuestros controladores es importante importar en cada uno de nuestros archivos controladores, la propiedad `validationResult` que nos proporciona Express Validator

```powershell
const { validationResult } = require('express-validator');
```

Y por último agregar el siguiente fragmento de código al inicio de cada método que sé que le he asignado una validación en mi enrutamiento:

```jsx
const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  }
```

Paso 5: Por ende nuestro archivo StateController debe quedar de la siguiente manera:

```jsx
const { State } = require('../models/StateModel')
const { validationResult } = require('express-validator');

const get = (request, response) => {
  
  const { nombre, abreviacion } = request.query
  const filters = {};

  if (nombre) {
    filters.nombre = nombre;
  }
  
  if (abreviacion) {
    filters.abreviacion = abreviacion;
  }

  State.findAll({
    where: filters
  })
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
        console.log(err)
      response.status(500).send('Error consultando los datos');
    })

}

const getById = (request, response) => {
  const id = request.params.id;
  State.findByPk(id)
    .then(entitie => {
      if (entitie) {
        response.json(entitie);
      }
      else {
        response.status(404).send('Recurso no encontrado')
      }
    })
    .catch(err => {
      response.status(500).send('Error al consultar el dato');
    })
}

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  }
  State.create(request.body).then(
    newEntitie => {
      response.status(201).json(newEntitie)
    }
  )
    .catch(err => {
      response.status(500).send('Error al crear');
    })
}

const update = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  }
  const id = request.params.id;
  State.update(
    request.body
    , 
    {
      where: {
        id: id
      }
    })
    .then(numRowsUpdated => {
      response.status(200).send(`${numRowsUpdated} registro actualizado`);
    })
    .catch(err => {
      response.status(500).send('Error al actualizar');
    });
}

const destroy = (request, response) => {
  const id = request.params.id;
  State.destroy(
    {
      where: {
        id: id
      }
    }
  ).then(numRowsDeleted => {
    response.status(200).send(`${numRowsDeleted} registro eliminado`);
  })
    .catch(err => {
      response.status(500).send('Error al eliminar');
    });
}

module.exports = {
  get,
  getById,
  create,
  update,
  destroy
};
```

***Actividad: Crear las validaciones correspondiente para cada controlador, asignarlas como middleware a su ruta correspondiente y verificar su funcionamiento***


CategoryValidator.js

const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');

const validatorCategoryCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value, { request }) => {
            return Category.findOne({ where: { nombre: value } })
                .then((Category) => {
                    if (Category) {
                        throw new Error('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),

    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio')
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom((value, { request }) => {
            return Category.findOne({ where: { descripcion: value } })
                .then((Category) => {
                    if (Category) {
                        throw new Error('Ya existe una descripcion con el mismo nombre');
                    }
                });
        }),
        
    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

const validatorCategoryUpdate = [
    check('nombre').optional()
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value, { request }) => {
            return Category.findOne({ where: { nombre: value } })
                .then((Category) => {
                    if (Category) {
                        throw new Error('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),

    check('descripcion').optional()
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom((value, { request }) => {
            return Category.findOne({ where: { descripcion: value } })
                .then((Category) => {
                    if (Category) {
                        throw new Error('Ya existe una descripcion con el mismo nombre');
                    }
                });
        }),

    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano'),
]
module.exports = {
    validatorCategoryCreate,
    validatorCategoryUpdate
}

NewValidator.js

const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
    check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom((value, { request }) => {
            return Category.findOne({ where: { id: value, activo: true } })
                .then((category) => {
                    if (!category) {
                        throw new Error('No existe una categoria con ese id');
                    }
                });
        }),

    check('usuario_id').notEmpty().withMessage('El campo usuario_id es obligatorio').isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom((value, { request }) => {
            return User.findOne({ where: { id: value, activo: true } })
                .then((user) => {
                    if (!user) {
                        throw new Error('No existe una usuario con ese id');
                    }
                });
        }),

    check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom((value, { request }) => {
            return State.findOne({ where: { id: value, activo: true } })
                .then((state) => {
                    if (!state) {
                        throw new Error('No existe una estado con ese id');
                    }
                });
        }),

    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    check('imagen').notEmpty().withMessage('El campo imagen es obligatorio').isBase64().withMessage('El campo imagen debe ser un Base 64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),

];

const validatorNewUpdate = [
    check('categoria_id').optional().isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom((value, { request }) => {
            return Category.findOne({ where: { id: value, activo: true } })
                .then((category) => {
                    if (!category) {
                        throw new Error('No existe una categoria con ese id');
                    }
                });
        }),
    check('usuario_id').optional().isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom((value, { request }) => {
            return User.findOne({ where: { id: value, activo: true } })
                .then((user) => {
                    if (!user) {
                        throw new Error('No existe una usuario con ese id');
                    }
                });
        }),
    check('estado_id').optional().isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom((value, { request }) => {
            return State.findOne({ where: { id: value, activo: true } })
                .then((state) => {
                    if (!state) {
                        throw new Error('No existe una estado con ese id');
                    }
                });
        }),

    check('titulo').optional().isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('descripcion').optional().isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    check('imagen').optional().isBase64().withMessage('El campo imagen debe ser un Base 64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

module.exports = {
    validatorNewCreate,
    validatorNewUpdate
}

UserValidator.js

const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

const validatorUserCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

    check('apellidos').notEmpty().withMessage('El campo apellido es obligatorio')
        .isString().withMessage('El campo apellido debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),


    check('nick').notEmpty().withMessage('El campo nick es obligatorio')
        .isString().withMessage('El campo nick debe ser texto')
        .isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),

    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo valido')
        .custom((value, { request }) => {
            return User.findOne({ where: { correo: value } })
                .then((user) => {
                    if (user) {
                        throw new Error('Ya existe un usuario con el mismo correo');
                    }
                });
        }),

    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isString().withMessage('El campo constraseña debe ser texto')
        .isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),

    check('perfil_id').notEmpty().withMessage('El campo perfil id es obligatorio')
        .isInt().withMessage('El campo perfil id debe ser numero')
        .custom((value, { request }) => {
            return Profile.findOne({ where: { id: value } })
                .then((profile) => {
                    if (!profile) {
                        throw new Error('No existe un perfil con ese id');
                    }
                });
        }),
];


const validatorUserUpdate = [
    check('nombre').optional()
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

    check('apellidos').optional()
        .isString().withMessage('El campo apellido debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),


    check('nick').optional()
        .isString().withMessage('El campo nick debe ser texto')
        .isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),


    check('contraseña').optional()
        .isString().withMessage('El campo constraseña debe ser texto')
        .isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),

    check('perfil_id').optional()
        .isInt().withMessage('El campo perfil id debe ser numero')
        .custom((value, { request }) => {
            return Profile.findOne({ where: { id: value } })
                .then((profile) => {
                    if (!profile) {
                        throw new Error('No existe un perfil con ese id');
                    }
                });
        }),
];

module.exports = {
    validatorUserCreate,
    validatorUserUpdate
}


​
StateValidator.js


const { check } = require('express-validator');
const { State } = require('../models/StateModel');

const validatorStateRequire = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres')
                   .custom((value, {request}) => {
                        return State.findOne({ where: { nombre: value } })
                        .then((state) => {
                        if (state) {
                            throw new Error('Ya existe un estado con el mismo nombre');
                        }
                        });
                   }),

    check('abreviacion').notEmpty().withMessage('El campo abreviacion es obligatorio')
                        .isString().withMessage('El campo nombre debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres')
];

const validatorStateOptional = [
    check('nombre').optional()
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres'),

    check('abreviacion').optional()
                        .isString().withMessage('El campo nombre debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres'),
]


module.exports = {
    validatorStateRequire,
    validatorStateOptional
}


