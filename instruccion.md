# **Controladores en Express JS**

En Express.js, los controladores son funciones o módulos que se utilizan para manejar y responder a las solicitudes HTTP entrantes. Express.js es un marco de aplicaciones web de Node.js que facilita la creación de servidores y la implementación de rutas para manejar diferentes tipos de solicitudes.

Los controladores en Express.js ayudan a separar la lógica empresarial y las acciones específicas de una ruta en funciones reutilizables y modularizadas. En lugar de definir todas las operaciones y la lógica en el archivo de definición de ruta, los controladores permiten mantener el código más limpio, modular y fácil de mantener.

Un controlador en Express.js generalmente sigue el patrón de función middleware. Recibe dos objetos, **`req`** (solicitud) y **`res`** (respuesta), que representan la solicitud HTTP entrante y la respuesta HTTP que se enviará al cliente, respectivamente.

Ejemplo de un controlador en Express JS:
// Controlador para la ruta GET '/users'
function getUsers(req, res) {
  // Lógica para obtener los usuarios de la base de datos
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];

  // Enviar respuesta al cliente
  res.json(users);
}

// Ruta que utiliza el controlador
app.get('/users', getUsers);

6.1 Métodos de Sequelize para trabajar con controladores
Al trabajar con los modelos de Sequelize, nos ofrece una amplia variedad de métodos para trabajar nuestras consultas. A continuación se presentan algunos de los métodos que Sequelize ofrece para realizar dichas consultas.
findAll: Este método se utiliza para recuperar todos los registros que coinciden con ciertos criterios. Puede usarse para obtener todos los registros en una tabla o para filtrar los resultados utilizando cláusulas where, attributes (para seleccionar columnas específicas) y otras opciones.
//Obtener todos
User.findAll();

//Obtener todos con solo ciertos atributos
User.findAll({
			attributes: ['id', 'name', 'email']
});

//Obtener filtrado con ciertos atributos
User.findAll({
			where: {
				name: 'Jhon'
			},
			attributes: ['id', 'name', 'email']
});
​
findOne: Este método se utiliza para recuperar un solo registro que cumple con ciertas condiciones.
User.findOne({ where: { email: 'example@example.com' }, attributes: ['nick'] });
​
findByPk: Este método se utiliza para recuperar un registro por su clave primaria (primary key).
User.findByPk(1);
​
create: Este método se utiliza para crear un nuevo registro en la base de datos.
User.create({ name: 'John', age: 25, email: 'john@example.com' });
​
update: Este método se utiliza para actualizar uno o varios registros en la base de datos que cumplan con ciertas condiciones.
User.update(
			{ 
				name: "Martin",
				age: 26 
			}, 
			{ where: { 
					id: 1 
				} 
			}
);
​
destroy: Este método se utiliza para eliminar uno o varios registros de la base de datos que cumplan con ciertas condiciones.
User.destroy({ 
		where: { age: 18 } 
	}
);
​
count: Este método se utiliza para contar el número de registros que coinciden con ciertas condiciones.
User.count({ 
				where: { age: { [Op.gt]: 18 } 
		} 
});
​
Estos son solo algunos ejemplos de los métodos que Sequelize ofrece para realizar consultas SQL utilizando sus modelos. Sequelize también proporciona muchas otras opciones y métodos avanzados para realizar operaciones más complejas en bases de datos relacionales. Consulta la documentación oficial de Sequelize para obtener más información sobre todas las opciones disponibles.
Ejemplo de un controlador en ExpressJS con las consultas básicas
const { User } = require('../models/UserModel')

//Obtener todos o filtrado
const get = (request, response) => {
  const filters = request.query
  User.findAll({
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

//Obtener uno por su id
const getById = (request, response) => {
  const id = request.params.id;
  User.findByPk(id)
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

//Crear nuevo
const create = (request, response) => {
  User.create(request.body).then(
    newEntitie => {
      response.status(201).json(newEntitie)
    }
  )
    .catch(err => {
      response.status(500).send('Error al crear');
    })
}

//Actualizar
const update = (request, response) => {
  const id = request.params.id;
  User.update(
    request.body
    , {
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

//Eliminar
const destroy = (request, response) => {
  const id = request.params.id;
  User.destroy(
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
​
6.2 Creación de los controladores para nuestra API
Una vez que ya conocemos todas las posibilidades que nos brinda Sequelize para la creación de nuestros controladores, es hora de crear los propios para nuestra API según los endpoints que establecimos con anterioridad.
Vamos a ver como crear y enrutar nuestro controlador para nuestro modelo Profile
Paso 1: En la raíz de nuestro proyecto vamos a crear una carpeta que se llame controllers
Paso 2: Dentro de la carpeta creada vamos a crear un archivo llamado ProfileController.js
Paso 3: Pegar el siguiente código:

const { Profile } = require('../models/ProfileModel')
const get = (request, response) => {
  const { nombre} = request.query
  const filters = {}

  if(nombre){
    filters.nombre = nombre
  }

  Profile.findAll({
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
  Profile.findByPk(id)
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

  Profile.create(request.body).then(
    newEntitie => {
      response.status(201).json(newEntitie)
    }
  )
    .catch(err => {
      response.status(500).send('Error al crear');
    })
}

const update = (request, response) => {
  const id = request.params.id;
  Profile.update(
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
  Profile.destroy(
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
​
Paso 4: Una vez ya creado nuestro controlador, necesitamos enrutarlo, para eso vamos a crear una carpeta en la raíz de nuestro proyecto, esta se llamará routes
Paso 5: Dentro de esta carpeta que acabamos de crear, crearemos un archivo llamado ProfileRoute.js y pegamos el siguiente código


var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/ProfileController');
const api = express.Router();

api.get('/perfiles', get);
api.get('/perfiles/:id', getById)
api.post('/perfiles', create)
api.put('/perfiles/:id', update)
api.delete('/perfiles/:id', destroy)


module.exports = api;
​
Paso 6: Ahora en nuestro archivo principal llamado app.js debemos exportar y usar las rutas que acabamos de crear, el archivo se debe de ver de la siguiente manera

onst express = require('express')
const app = express();
const PORT = 3000

app.use(express.json());

//Exportar Rutas
const profile_routes = require('./routes/ProfileRoute');

//Usar las rutas

app.use('/api', profile_routes)

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;
​
Paso 7: Correr nuestra api en la terminal con el comando node app.js y consumir nuestras rutas en Thunder Client
Tarea: Crear los demás controladores para nuestros modelos

CategoryController.js

const {Category} = require('../models/CategoryModel')

const get = (request, response) => {
    const {nombre,descripcion,activo,useralta} =request.query
    const filters = {}
    if (nombre) {
        filters.nombre = nombre 
    }
    if (descripcion) {
        filters.descripcion = descripcion
    }
    if (activo){
        filters.activo = activo
    }
    if (useralta){
        filters.useralta =useralta
    }

    //const filters = request.query
    Category.findAll({
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
    Category.findByPk(id)

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

    Category.create(request.body).then(
      newEntitie => {
        response.status(201).json(newEntitie)
      }
    )
      .catch(err => {
        response.status(500).send('Error al crear');
      })
  }
  
  const update = (request, response) => {
    const id = request.params.id;
    Category.update(
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
    Category.destroy(
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

  ## NewController.js

  const { New } = require('../models/NewModel')

const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
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
    New.findByPk(id)

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
    New.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

const update = (request, response) => {
    const id = request.params.id;
    New.update(
        request.body
        , {
            where: {
                id: id
            }
        }
    )
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({
        where: {
            id: id
        }
    })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
}

module.exports = { get, getById, create, update, destroy };

StateController.js

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

 ## StateController.js

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

## UserController.js

const { User } = require('../models/UserModel')

const get = (request, response) => {
    const { nombre, apellidos, nick } = request.query
    const filters = {}

    if (nombre) {
        filters.nombre = nombre
    }
    if (apellidos) {
        filters.apellidos = apellidos
    }
    if (nick) {
        filters.nick = nick
    }

    User.findAll({
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
    User.findByPk(id)

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

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

const update = (request, response) => {
    const id = request.params.id;
    User.update(
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
    User.destroy(
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

## CategoryRoute.js

var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/CategoryController');
const api = express.Router();

api.get('/categorias', get);
api.get('/categorias/:id', getById)
api.post('/categorias', create)
api.put('/categorias/:id', update)
api.delete('/categorias/:id', destroy)


module.exports = api;

## NewRoute.js

const express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/NewController');

const api = express.Router();

api.get('/noticias', get);
api.get('/noticias/:id', getById)
api.post('/noticias', create)
api.put('/noticias/:id', update)
api.delete('/noticias/:id', destroy)

module.exports = api;

## StateRoute.js

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

## UserRoute.js

var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/UserController');
const api = express.Router();

api.get('/usuarios', get);
api.get('/usuarios/:id', getById)
api.post('/usuarios', create)
api.put('/usuarios/:id', update)
api.delete('/usuarios/:id', destroy)


module.exports = api;

## app.js

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



//Usar las rutas
app.use('/api', profile_routes, state_routes, category_routes, new_routes, user_routes)

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;

6.3 Aplicando las relaciones en nuestros controladores
El parámetro include se utiliza en los métodos de consulta para obtener registros, como findAll, findByPk, findOne , nos ayuda a especificar las relaciones que deseas incluir en la consulta. Permite obtener los datos de los modelos relacionados junto con los datos del modelo principal en una sola consulta.
El parámetro include acepta un array de objetos, donde cada objeto representa una relación que deseas incluir. Cada objeto de relación tiene las siguientes propiedades:
model: Especifica el modelo de la relación que deseas incluir.
as (opcional): Especifica el alias o nombre de la relación. Debe coincidir con el alias que has utilizado al configurar la relación en los modelos.
attributes (opcional): Permite especificar los atributos específicos del modelo relacionado que deseas incluir en los resultados. Puedes utilizar un array de nombres de atributos para seleccionar los atributos específicos que deseas obtener.
where (opcional): Permite aplicar condiciones adicionales a la relación incluida. Puedes utilizar cualquier operador de comparación o función de Sequelize para definir las condiciones.
include (opcional): Permite anidar relaciones incluidas dentro de la relación principal. Esto es útil cuando tienes relaciones en cascada.
Aquí hay un ejemplo de cómo usar el parámetro include en findAll para incluir la relación "categoria" del modelo New:
const { Category } = require('../models/CategoryModel')

const relations = [
    { model: Category, attributes: ['id', 'nombre'], as: 'categoria'}    
]

const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
        where: filters,
        include: relations
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })
}
​
Actividad: Traer las demás relaciones del modelo New y las relaciones del modelo User
Por lo tanto NewController.js
const { New } = require('../models/NewModel')
const { Category } = require('../models/CategoryModel')
const { State } = require('../models/StateModel')
const { User } = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')

const relationsUser = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
]

const relations = [
    { model: Category, attributes: ['id', 'nombre', 'descripcion'], as: 'categoria' },
    { model: State, attributes: ['id', 'nombre', 'abreviacion'], as: 'estado' },
    { model: User, attributes: ['id', 'perfil_id', 'nick', 'nombre'], as: 'usuario', include: relationsUser }
]

const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
        where: filters,
        include: relations
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
    New.findByPk(id, {
        include: relations
    })

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
    New.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

const update = (request, response) => {
    const id = request.params.id;
    New.update(
        request.body
        , {
            where: {
                id: id
            }
        }
    )
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({
        where: {
            id: id
        }
    })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
}

module.exports = { get, getById, create, update, destroy };
​
UserController.js
const { User } = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')

const relations = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
]

const get = (request, response) => {
    const { nombre, apellidos, nick } = request.query
    const filters = {}

    if (nombre) {
        filters.nombre = nombre
    }
    if (apellidos) {
        filters.apellidos = apellidos
    }
    if (nick) {
        filters.nick = nick
    }

    User.findAll({
        where: filters,
        include: relations
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
    User.findByPk(id, {
        include: relations
    })

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

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

const update = (request, response) => {
    const id = request.params.id;
    User.update(
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
    User.destroy(
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
