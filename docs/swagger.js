const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Control - Express.js con Sequelize',
      version: '1.0.0',
      description: `
        Una API REST robusta construida con Express.js y Sequelize siguiendo principios de arquitectura limpia y escalable.
        
        ## Características
        - ✅ Operaciones CRUD completas
        - ✅ Relaciones entre modelos
        - ✅ Validación de datos
        - ✅ Manejo de errores
        - ✅ Filtrado por parámetros de consulta
        
        ## Modelos principales
        - **Perfiles**: Tipos de usuarios del sistema
        - **Usuarios**: Usuarios con perfiles asignados
        - **Categorías**: Clasificación de noticias
        - **Estados**: Estados/regiones geográficos
        - **Noticias**: Artículos con relaciones completas
      `,
      contact: {
        name: 'API Support',
        email: 'support@control-api.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://api.control.com',
        description: 'Servidor de producción'
      }
    ],
    tags: [
      {
        name: 'Perfiles',
        description: 'Gestión de perfiles de usuario'
      },
      {
        name: 'Usuarios',
        description: 'Gestión de usuarios del sistema'
      },
      {
        name: 'Categorías',
        description: 'Gestión de categorías para noticias'
      },
      {
        name: 'Estados',
        description: 'Gestión de estados/regiones geográficos'
      },
      {
        name: 'Noticias',
        description: 'Gestión de noticias y artículos'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // Esquema base para respuestas de error
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            },
            message: {
              type: 'string',
              description: 'Descripción detallada del error'
            }
          }
        },
        // Esquema para errores de validación
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'object',
              description: 'Errores de validación por campo',
              additionalProperties: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    description: 'Mensaje de error de validación'
                  },
                  param: {
                    type: 'string',
                    description: 'Parámetro que causó el error'
                  },
                  location: {
                    type: 'string',
                    description: 'Ubicación del error (body, query, params)'
                  }
                }
              }
            }
          }
        },
        // Esquema Profile
        Profile: {
          type: 'object',
          required: ['nombre'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del perfil',
              example: 1
            },
            nombre: {
              type: 'string',
              description: 'Nombre del perfil',
              example: 'Administrador'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del perfil',
              example: 'Perfil con acceso total al sistema'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechaalta: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2024-01-15T10:30:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que creó el registro',
              example: 'admin'
            }
          }
        },
        ProfileInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del perfil',
              example: 'Editor'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del perfil',
              example: 'Perfil para editores de contenido'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            useralta: {
              type: 'string',
              description: 'Usuario que crea el registro',
              example: 'admin'
            }
          }
        },
        // Esquema Category
        Category: {
          type: 'object',
          required: ['nombre'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la categoría',
              example: 1
            },
            nombre: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Tecnología'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción de la categoría',
              example: 'Noticias relacionadas con tecnología'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechaalta: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2024-01-15T10:30:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que creó el registro',
              example: 'admin'
            }
          }
        },
        CategoryInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Deportes'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción de la categoría',
              example: 'Noticias deportivas y eventos'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            useralta: {
              type: 'string',
              description: 'Usuario que crea el registro',
              example: 'admin'
            }
          }
        },
        // Esquema State
        State: {
          type: 'object',
          required: ['nombre', 'abreviacion'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del estado',
              example: 1
            },
            nombre: {
              type: 'string',
              description: 'Nombre del estado',
              example: 'Jalisco'
            },
            abreviacion: {
              type: 'string',
              description: 'Abreviación del estado (mayúsculas)',
              example: 'JAL',
              maxLength: 10
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechaalta: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2024-01-15T10:30:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que creó el registro',
              example: 'admin'
            }
          }
        },
        StateInput: {
          type: 'object',
          required: ['nombre', 'abreviacion'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del estado (solo letras y espacios)',
              example: 'Nuevo León',
              minLength: 2,
              maxLength: 100
            },
            abreviacion: {
              type: 'string',
              description: 'Abreviación del estado (solo mayúsculas)',
              example: 'NL',
              minLength: 1,
              maxLength: 10,
              pattern: '^[A-Z]{1,10}$'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            useralta: {
              type: 'string',
              description: 'Usuario que crea el registro',
              example: 'admin',
              maxLength: 50
            }
          }
        },
        // Esquema User
        User: {
          type: 'object',
          required: ['perfil_id', 'nick', 'nombre', 'apellidos', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del usuario',
              example: 1
            },
            perfil_id: {
              type: 'integer',
              description: 'ID del perfil asignado',
              example: 1
            },
            nick: {
              type: 'string',
              description: 'Nombre de usuario único',
              example: 'jdoe'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'Juan'
            },
            apellidos: {
              type: 'string',
              description: 'Apellidos del usuario',
              example: 'Pérez García'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico único',
              example: 'juan.perez@email.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario',
              example: 'password123'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechaalta: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2024-01-15T10:30:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que creó el registro',
              example: 'admin'
            },
            perfil: {
              $ref: '#/components/schemas/Profile',
              description: 'Información del perfil asociado'
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['perfil_id', 'nick', 'nombre', 'apellidos', 'email', 'password'],
          properties: {
            perfil_id: {
              type: 'integer',
              description: 'ID del perfil a asignar',
              example: 2
            },
            nick: {
              type: 'string',
              description: 'Nombre de usuario único',
              example: 'mrodriguez'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'María'
            },
            apellidos: {
              type: 'string',
              description: 'Apellidos del usuario',
              example: 'Rodríguez López'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico único',
              example: 'maria.rodriguez@email.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario',
              example: 'securepass456'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            useralta: {
              type: 'string',
              description: 'Usuario que crea el registro',
              example: 'admin'
            }
          }
        },
        // Esquema New
        New: {
          type: 'object',
          required: ['categoria_id', 'estado_id', 'usuario_id', 'titulo', 'contenido'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la noticia',
              example: 1
            },
            categoria_id: {
              type: 'integer',
              description: 'ID de la categoría',
              example: 1
            },
            estado_id: {
              type: 'integer',
              description: 'ID del estado',
              example: 1
            },
            usuario_id: {
              type: 'integer',
              description: 'ID del usuario autor',
              example: 1
            },
            titulo: {
              type: 'string',
              description: 'Título de la noticia',
              example: 'Nueva tecnología revoluciona el mercado'
            },
            contenido: {
              type: 'string',
              description: 'Contenido completo de la noticia',
              example: 'El desarrollo de una nueva tecnología está transformando...'
            },
            resumen: {
              type: 'string',
              description: 'Resumen de la noticia',
              example: 'Breve descripción de los avances tecnológicos...'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechapublicacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de publicación',
              example: '2024-01-20T14:30:00Z'
            },
            fechaalta: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2024-01-15T10:30:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que creó el registro',
              example: 'admin'
            },
            categoria: {
              $ref: '#/components/schemas/Category',
              description: 'Información de la categoría'
            },
            estado: {
              $ref: '#/components/schemas/State',
              description: 'Información del estado'
            },
            usuario: {
              $ref: '#/components/schemas/User',
              description: 'Información del usuario autor'
            }
          }
        },
        NewInput: {
          type: 'object',
          required: ['categoria_id', 'estado_id', 'usuario_id', 'titulo', 'contenido'],
          properties: {
            categoria_id: {
              type: 'integer',
              description: 'ID de la categoría',
              example: 1
            },
            estado_id: {
              type: 'integer',
              description: 'ID del estado',
              example: 1
            },
            usuario_id: {
              type: 'integer',
              description: 'ID del usuario autor',
              example: 1
            },
            titulo: {
              type: 'string',
              description: 'Título de la noticia',
              example: 'Avances en inteligencia artificial'
            },
            contenido: {
              type: 'string',
              description: 'Contenido completo de la noticia',
              example: 'Los últimos desarrollos en IA están...'
            },
            resumen: {
              type: 'string',
              description: 'Resumen de la noticia',
              example: 'Resumen de los avances más importantes...'
            },
            activo: {
              type: 'boolean',
              description: 'Estado activo/inactivo',
              example: true
            },
            fechapublicacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de publicación',
              example: '2024-01-25T16:00:00Z'
            },
            useralta: {
              type: 'string',
              description: 'Usuario que crea el registro',
              example: 'editor'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // todas las rutas con base de datos JSON
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
};