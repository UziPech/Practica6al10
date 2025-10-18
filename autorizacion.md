# **Autenticación y autorización**

La autenticación y autorización son dos aspectos fundamentales en el desarrollo de una API y juegan un papel clave en la seguridad y protección de los recursos y datos que se exponen a través de ella. Aquí te explico brevemente la importancia de cada uno:

1. `Autenticación`: La autenticación se refiere al proceso de verificar la identidad de un usuario o una aplicación antes de permitirles el acceso a la API. Permite asegurarse de que solo las entidades autorizadas puedan utilizar los servicios proporcionados por la API. Al implementar un mecanismo de autenticación adecuado, se evita que usuarios no autorizados puedan acceder a recursos sensibles o realizar acciones no permitidas. Ejemplos comunes de métodos de autenticación incluyen el uso de tokens de acceso, claves de API, nombres de usuario y contraseñas, certificados digitales, etc.
2. `Autorización`: Una vez que un usuario o una aplicación ha sido autenticado con éxito, la autorización determina qué acciones y recursos específicos están permitidos para ese usuario o aplicación en particular. La autorización se ocupa de establecer los niveles de acceso y los permisos necesarios para realizar determinadas operaciones. Por ejemplo, una API puede definir diferentes roles (administrador, usuario regular, invitado) y asignar permisos a cada uno de ellos. Esto permite controlar quién puede leer, escribir, modificar o eliminar datos en la API. La autorización adecuada ayuda a garantizar la integridad de los datos y la protección de la información confidencial.

En conjunto, la autenticación y la autorización son esenciales para proteger los recursos y datos expuestos a través de una API. Al implementar adecuadamente estos mecanismos de seguridad, se establece una capa de protección que reduce el riesgo de accesos no autorizados, manipulación indebida de datos y otros ataques maliciosos. Además, proporcionan una forma de rastrear y auditar las acciones realizadas en la API, lo que es fundamental para mantener la integridad y la confianza en el sistema.

## 8.1 JSON Web Token

JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define un formato compacto y seguro para transmitir información entre dos partes de forma confiable. Un JWT es un objeto JSON que consta de tres partes separadas por puntos y codificadas en Base64 URL:

1. `Encabezado (Header):` Contiene información sobre el tipo de token y el algoritmo de firma utilizado. Por ejemplo:
    
    ```json
    jsonCopy code
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```
    
    En este caso, se utiliza el algoritmo HMAC-SHA256 (HS256) para firmar el token.
    
2. `Carga útil (Payload):` Es donde se incluye la información que se desea transmitir de manera segura. Puede contener cualquier dato JSON válido. Algunos de los campos comunes en la carga útil incluyen el identificador del usuario, roles, permisos u otra información relevante. Por ejemplo:
    
    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
    }
    ```
    
3. `Vencimiento (Expiration):` Nos sirve para definir una fecha y hora en la cual el token deja de ser válido. Esto brinda un mecanismo para controlar la duración de la sesión y restringir el tiempo durante el cual un token puede ser utilizado para acceder a recursos protegidos.
    
    El vencimiento de un JWT se especifica en la carga útil (payload) utilizando el campo "exp" (expiration time) y se representa como un valor numérico llamado "Unix timestamp". Este valor representa la cantidad de segundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC (conocido como "Epoch time").
    
    Por ejemplo, en la carga útil de un JWT, se puede incluir el campo "exp" de la siguiente manera:
    
    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "exp": 1678425600
    }
    ```
    
    En este caso, el valor "1678425600" representa una fecha y hora específica en formato Unix timestamp. Cuando un receptor del token recibe este JWT, puede verificar si el token está dentro de su período de validez comparando el valor "exp" con la fecha y hora actual.
    
4. `Firma (Signature):` Se utiliza para verificar la integridad del token y asegurar que no ha sido manipulado. La firma se crea combinando el encabezado codificado en Base64 URL, la carga útil codificada en Base64 URL y una clave secreta compartida. La firma se genera utilizando el algoritmo especificado en el encabezado. Por ejemplo:
    
    ```
    scssCopy code
    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)
    ```
    
    Donde **`secret`** es una clave secreta que solo conocen el emisor y el receptor del token.
    
    El JWT se envía a través de las solicitudes HTTP en los encabezados de autorización, generalmente en el formato **`Bearer <token>`**. El receptor del token puede verificar su validez utilizando la clave secreta compartida y comparando la firma calculada con la firma proporcionada en el token recibido.
    

Los JWT son ampliamente utilizados en aplicaciones web y APIs como mecanismo de autenticación y autorización. Al ser autocontenidos y firmados, no es necesario almacenar el estado del usuario en el servidor, lo que los hace escalables y eficientes. Además, los JWT pueden incluir información adicional en la carga útil, lo que permite transmitir datos relevantes junto con la autenticación.

Sin embargo, es importante tener en cuenta que los JWT no son cifrados, por lo que no se deben incluir datos sensibles en la carga útil. Además, se deben tomar precauciones para proteger la clave secreta utilizada para firmar los tokens y evitar que caigan en manos equivocadas.

## 8.2 Implementando JWT en nuestra API

**Paso 1:** Instalar JSON Web Token

```powershell
npm install jsonwebtoken
```

**Paso 2:** Antes de proceder con las implementaciones de JWT es importante crear un servicio de login y registro para nuestra API

***Actividad: Crea un controlador que permita logear (regresar un código de estado 201 con un mensaje que diga “Login con éxito” cuando las credenciales son correctas correo y contraseña y un mensaje de “Sin autorización” con el código de estado 401 en dado caso que no lo sean)  y un método que permita registrar a un usuario dentro de nuestra API (el metodo no debe solicitar el perfil_id si no que directamente nosotros le mandaremos el 2 ya que será nuestro endpoint abierto para los contribuidores), el archivo se debe llamar `AuthController.js` así como su archivo de enrutamiento `AuthRoute.js`. Para poder realizar este ejercicio aplica tus conocimientos en consultas con Sequelize, así como las validaciones correspondientes en un archivo llamado `AuthValidator.js` , ten en cuenta los endpoints para estos métodos definidos en el módulo 4.1***

AuthController.js

```jsx
const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
    }).then(entitie => {
            if (entitie) {
                response.status(201).json({message: "Login con éxito"});
            }
            else {
                response.status(401).json({message: "Sin autorización"});

            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.status = true

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

module.exports = {
    login,
    register,
};
```

AuthValidator.js

```jsx
const { check } = require('express-validator');
const { User } = require('../models/UserModel');

const validatorLogin = [
    check('correo').notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El campo correo debe ser un correo válido'),

    check('contraseña').notEmpty().withMessage('El campo contraseña es requerido')
]

const validatorRegister = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio')
        .isString().withMessage('El campo apellidos debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo apellidos debe tener entre 2 y 100 caracteres'),

    check('nick').notEmpty().withMessage('El campo nick es obligatorio')
        .isString().withMessage('El campo nick debe ser texto')
        .isLength({ min: 2, max: 20 }).withMessage('El campo nick debe tener entre 2 y 20 caracteres'),

    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('El campo correo debe ser un correo valido')
        .isLength({ min: 2, max: 255 }).withMessage('El campo correo debe tener entre 2 y 255 caracteres')
        .custom((value, { request }) => {
            return User.findOne({ where: { correo: value } })
                .then((user) => {
                    if (user) {
                        throw new Error('Ya existe un usuario con este correo ')
                    }
                })
        }),

    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isString().withMessage('El campo contraseña debe ser texto')
        .isLength({ min: 8, max: 255 }).withMessage('El campo correo debe tener entre 8 y 255 caracteres'),
]

module.exports = {
    validatorLogin,
    validatorRegister
}
```

AuthRoute.js

```jsx
var express = require('express');

const { login, register, } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const api = express.Router();

api.post('/auth/login', validatorLogin, login);
api.post('/auth/registro/', validatorRegister, register)

module.exports = api;
```

app.js

```jsx
const express = require('express')
const app = express();
const PORT = 3000

app.use(express.json());

//Exportar Rutas
const profile_routes = require('./routes/ProfileRoute');
const state_routes = require('./routes/StateRoute');
const category_routes = require('./routes/CategoryRoute');
const new_routes = require('./routes/NewRoute');
const user_routes = require('./routes/UserRoute');
const auth_routes = require('./routes/AuthRoute')

//Usar las rutas
app.use('/api', profile_routes, state_routes, category_routes, new_routes, user_routes, auth_routes)

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;
```

**Paso 3:** Una vez que hemos creado nuestro controlador de login y registro es momento de implementar JWT al momento de que un usuario se logea, para eso generaremos un token el cual se le devolverá en la respuesta de nuestra solicitud, teniendo el siguiente código.

AuthController.js

```jsx
const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
        attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick']
    }).then(usuario => {
        if (usuario) {
            const token = jwt.sign({ usuario }, 'mi_llave_secreta', { expiresIn: '24h' });
            response.status(201).json({ message: "Login con éxito", token: token });
        }
        else {
            response.status(401).json({ message: "Sin autorización" });

        }
    })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.status = true

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

module.exports = {
    login,
    register,
};
```

8.3 Protección de nuestros Endpoints con JWT 
La protección de rutas en una API se refiere a la implementación de medidas de seguridad para controlar y restringir el acceso a ciertos endpoints o recursos de la API. Esto se hace para garantizar que solo los usuarios autorizados puedan acceder y realizar ciertas operaciones en esos endpoints.
La protección de rutas se utiliza para prevenir accesos no autorizados y garantizar la confidencialidad, integridad y disponibilidad de los datos y funcionalidades expuestos a través de la API. Al implementar la protección de rutas, se pueden aplicar diferentes técnicas y estrategias de seguridad, como la autenticación y la autorización.
Ahora que ya sabemos que es la protección de rutas, vamos a ver como protegerlas haciendo uso de JWT con el token que generamos en el submódulo anterior.
Paso 1: En la raíz de nuestro proyecto, creamos una carpeta que se llame middlewares
Paso 2: Dentro de la carpeta que acabamos de crear, creamos un archivo llamado jwt.js, en este implementaremos todos los middlewares correspondientes a JWT para la protección de nuestras rutas
Paso 3: Dentro del archivo pegamos el siguiente código:
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded.usuario.perfil_id === 1) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}


module.exports = {
    authenticateAdmin
};
​
La función llamada authenticateAdmin es un middleware de autenticación que nos sirve para verificar si un usuario tiene permisos de administrador.
Se define la función authenticateAdmin con tres parámetros: req, res y next. Estos parámetros representan el objeto de solicitud (request), objeto de respuesta (response) y una función de siguiente middleware, respectivamente.
Se obtiene el encabezado de autorización de la solicitud mediante req.headers.authorization. El encabezado de autorización suele contener un token de autenticación.
const token = authorization_header && authorization_header.split(' ')[1]; Esta línea utiliza el operador lógico && para comprobar si authorization_header tiene un valor. Si authorization_header no es null, undefined o una cadena vacía, entonces se realiza la siguiente operación. Esto evita errores si el encabezado de autorización no está presente en la solicitud.
Luego, se utiliza el método split(' ') para dividir el valor del encabezado de autorización en un array de cadenas, utilizando el espacio como separador. La función split divide una cadena en partes más pequeñas y devuelve un array con esas partes. En este caso, se asume que el token de autenticación está en la segunda posición del array resultante, por eso se accede al índice [1].
Por ejemplo, si authorization_header es "Bearer abcdefg123456", el resultado de authorization_header.split(' ') será ["Bearer", "abcdefg123456"], y token tomará el valor "abcdefg123456".
Se verifica si no se proporcionó ningún token. Si no hay un token, se envía una respuesta de estado 401 (no autorizado) con un mensaje indicando que no se proporcionó un token.
Se utiliza jwt.verify para verificar la validez del token. Toma el token, una clave secreta ("mi_llave_secreta" en este caso) y una función de devolución de llamada como argumentos. Si hay un error al verificar el token, se envía una respuesta de estado 403 (prohibido) con un mensaje indicando que no hay autorización.
Si el token se verifica correctamente, la función de devolución de llamada se ejecuta y recibe dos argumentos: err y decoded. err contiene información sobre cualquier error que ocurra durante la verificación, y decoded contiene la información decodificada del token.
Se verifica si el perfil del usuario (contenido en decoded.usuario.perfil_id) es igual a 1. Si es así, se llama a next() para pasar la solicitud al siguiente middleware. Esto indica que el usuario tiene los permisos de administrador necesarios.
Si el perfil del usuario no es igual a 1, se envía una respuesta de estado 403 (prohibido) con un mensaje indicando que no tiene autorización.
Ahora crearemos un Middleware para verificar que el token es valido sin importar el tipo de perfil, nuestro archivo jwt.js debe quedar de la siguiente manera
const jwt = require('jsonwebtoken');


const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded.usuario.perfil_id === 1) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}


module.exports = {
    authenticateAdmin,
    authenticateAny
};
​
Paso 4: Proteger las rutas donde consideremos que solo un administrador puede acceder y donde cualquier tipo de usuario pueda acceder
CategoryRoute.js
var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/CategoryController');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/categorias', get);
api.get('/categorias/:id', getById)
api.post('/categorias', authenticateAdmin, validatorCategoryCreate, create)
api.put('/categorias/:id', authenticateAdmin, validatorCategoryUpdate, update)
api.delete('/categorias/:id', authenticateAdmin, destroy)


module.exports = api;
​
NewRoute.js
const express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/NewController');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { authenticateAdmin, authenticateAny } = require('../middlewares/jwt')



const api = express.Router();

api.get('/noticias', get);
api.get('/noticias/:id', getById)
api.post('/noticias', authenticateAny, validatorNewCreate, create)
api.put('/noticias/:id', authenticateAny, validatorNewUpdate, update)
api.delete('/noticias/:id', authenticateAny,  destroy)

module.exports = api;
​
ProfileRoute.js
var express = require('express');

const {get, getById, }  = require('../controllers/ProfileController');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/perfiles', get);
api.get('/perfiles/:id', getById)


module.exports = api;
​
StateRoute.js
var express = require('express');


const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const {validatorStateRequire, validatorStateOptional} = require('../validators/StateValidator')
const { authenticateAdmin } = require('../middlewares/jwt')

const api = express.Router();

api.get('/estados', get);
api.get('/estados/:id', getById)
api.post('/estados', authenticateAdmin, validatorStateRequire, create)
api.put('/estados/:id', authenticateAdmin, validatorStateOptional, update)
api.delete('/estados/:id', authenticateAdmin, destroy)


module.exports = api;
​
UserRoute.js
var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/usuarios', authenticateAdmin, get);
api.get('/usuarios/:id', authenticateAdmin, getById)
api.post('/usuarios', authenticateAdmin, validatorUserCreate, create)
api.put('/usuarios/:id',authenticateAdmin, validatorUserUpdate, update)
api.delete('/usuarios/:id', authenticateAdmin, destroy)


module.exports = api;

## 8.3 Protección de nuestros Endpoints con JWT 
    La protección de rutas en una API se refiere a la implementación de medidas de seguridad para controlar y restringir el acceso a ciertos endpoints o recursos de la API. Esto se hace para garantizar que solo los usuarios autorizados puedan acceder y realizar ciertas operaciones en esos endpoints.

La protección de rutas se utiliza para prevenir accesos no autorizados y garantizar la confidencialidad, integridad y disponibilidad de los datos y funcionalidades expuestos a través de la API. Al implementar la protección de rutas, se pueden aplicar diferentes técnicas y estrategias de seguridad, como la autenticación y la autorización.

Ahora que ya sabemos que es la protección de rutas, vamos a ver como protegerlas haciendo uso de JWT con el token que generamos en el submódulo anterior.

**Paso 1:** En la raíz de nuestro proyecto, creamos una carpeta que se llame `middlewares`

**Paso 2:** Dentro de la carpeta que acabamos de crear, creamos un archivo llamado `jwt.js`, en este implementaremos todos los middlewares correspondientes a JWT para la protección de nuestras rutas


Paso 3: Dentro del archivo pegamos el siguiente código:
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded.usuario.perfil_id === 1) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}


module.exports = {
    authenticateAdmin
};

La función llamada **`authenticateAdmin`** es un middleware de autenticación que nos sirve para verificar si un usuario tiene permisos de administrador.

1. Se define la función **`authenticateAdmin`** con tres parámetros: **`req`**, **`res`** y **`next`**. Estos parámetros representan el objeto de solicitud (request), objeto de respuesta (response) y una función de siguiente middleware, respectivamente.
2. Se obtiene el encabezado de autorización de la solicitud mediante **`req.headers.authorization`**. El encabezado de autorización suele contener un token de autenticación.
3. **`const token = authorization_header && authorization_header.split(' ')[1];`** Esta línea utiliza el operador lógico **`&&`** para comprobar si **`authorization_header`** tiene un valor. Si **`authorization_header`** no es **`null`**, **`undefined`** o una cadena vacía, entonces se realiza la siguiente operación. Esto evita errores si el encabezado de autorización no está presente en la solicitud.
    
    Luego, se utiliza el método **`split(' ')`** para dividir el valor del encabezado de autorización en un array de cadenas, utilizando el espacio como separador. La función **`split`** divide una cadena en partes más pequeñas y devuelve un array con esas partes. En este caso, se asume que el token de autenticación está en la segunda posición del array resultante, por eso se accede al índice **`[1]`**.
    
    Por ejemplo, si **`authorization_header`** es **`"Bearer abcdefg123456"`**, el resultado de **`authorization_header.split(' ')`** será **`["Bearer", "abcdefg123456"]`**, y **`token`** tomará el valor **`"abcdefg123456"`**.
    
4. Se verifica si no se proporcionó ningún token. Si no hay un token, se envía una respuesta de estado 401 (no autorizado) con un mensaje indicando que no se proporcionó un token.
5. Se utiliza **`jwt.verify`** para verificar la validez del token. Toma el token, una clave secreta ("mi_llave_secreta" en este caso) y una función de devolución de llamada como argumentos. Si hay un error al verificar el token, se envía una respuesta de estado 403 (prohibido) con un mensaje indicando que no hay autorización.
6. Si el token se verifica correctamente, la función de devolución de llamada se ejecuta y recibe dos argumentos: **`err`** y **`decoded`**. **`err`** contiene información sobre cualquier error que ocurra durante la verificación, y **`decoded`** contiene la información decodificada del token.
7. Se verifica si el perfil del usuario (contenido en **`decoded.usuario.perfil_id`**) es igual a 1. Si es así, se llama a **`next()`** para pasar la solicitud al siguiente middleware. Esto indica que el usuario tiene los permisos de administrador necesarios.
8. Si el perfil del usuario no es igual a 1, se envía una respuesta de estado 403 (prohibido) con un mensaje indicando que no tiene autorización.

Ahora crearemos un Middleware para verificar que el token es valido sin importar el tipo de perfil, nuestro archivo jwt.js debe quedar de la siguiente manera

const jwt = require('jsonwebtoken');


const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded.usuario.perfil_id === 1) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header && authorization_header.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded) {
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}


module.exports = {
    authenticateAdmin,
    authenticateAny
};

Paso 4: Proteger las rutas donde consideremos que solo un administrador puede acceder y donde cualquier tipo de usuario pueda acceder

CategoryRoute.js
var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/CategoryController');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/categorias', get);
api.get('/categorias/:id', getById)
api.post('/categorias', authenticateAdmin, validatorCategoryCreate, create)
api.put('/categorias/:id', authenticateAdmin, validatorCategoryUpdate, update)
api.delete('/categorias/:id', authenticateAdmin, destroy)


module.exports = api;

NewRoute.js

const express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/NewController');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { authenticateAdmin, authenticateAny } = require('../middlewares/jwt')



const api = express.Router();

api.get('/noticias', get);
api.get('/noticias/:id', getById)
api.post('/noticias', authenticateAny, validatorNewCreate, create)
api.put('/noticias/:id', authenticateAny, validatorNewUpdate, update)
api.delete('/noticias/:id', authenticateAny,  destroy)

module.exports = api;

ProfileRoute.js

var express = require('express');

const {get, getById, }  = require('../controllers/ProfileController');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/perfiles', get);
api.get('/perfiles/:id', getById)


module.exports = api;

StateRoute.js

var express = require('express');


const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const {validatorStateRequire, validatorStateOptional} = require('../validators/StateValidator')
const { authenticateAdmin } = require('../middlewares/jwt')

const api = express.Router();

api.get('/estados', get);
api.get('/estados/:id', getById)
api.post('/estados', authenticateAdmin, validatorStateRequire, create)
api.put('/estados/:id', authenticateAdmin, validatorStateOptional, update)
api.delete('/estados/:id', authenticateAdmin, destroy)


module.exports = api;

UserRoute.js

var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/usuarios', authenticateAdmin, get);
api.get('/usuarios/:id', authenticateAdmin, getById)
api.post('/usuarios', authenticateAdmin, validatorUserCreate, create)
api.put('/usuarios/:id',authenticateAdmin, validatorUserUpdate, update)
api.delete('/usuarios/:id', authenticateAdmin, destroy)


module.exports = api;

