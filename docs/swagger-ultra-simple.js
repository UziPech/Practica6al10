const swaggerUi = require('swagger-ui-express');

const specs = {
  openapi: '3.0.0',
  info: {
    title: 'API Control - Simple y Funcional',
    version: '1.0.0',
    description: 'API REST simple con Express.js - ¡Funciona perfecto!'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor de desarrollo'
    }
  ],
  components: {
    schemas: {
      Profile: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Administrador' },
          descripcion: { type: 'string', example: 'Perfil con acceso total' },
          activo: { type: 'boolean', example: true }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Tecnología' },
          descripcion: { type: 'string', example: 'Noticias de tecnología' },
          activo: { type: 'boolean', example: true }
        }
      }
    }
  },
  paths: {
    '/api/perfiles': {
      get: {
        summary: 'Obtener todos los perfiles',
        tags: ['Perfiles'],
        responses: {
          200: {
            description: 'Lista de perfiles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Profile' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Crear nuevo perfil',
        tags: ['Perfiles'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Nuevo Perfil' },
                  descripcion: { type: 'string', example: 'Descripción' },
                  activo: { type: 'boolean', example: true }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Perfil creado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Profile' }
              }
            }
          }
        }
      }
    },
    '/api/perfiles/{id}': {
      get: {
        summary: 'Obtener perfil por ID',
        tags: ['Perfiles'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        responses: {
          200: {
            description: 'Perfil encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Profile' }
              }
            }
          }
        }
      },
      put: {
        summary: 'Actualizar perfil',
        tags: ['Perfiles'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Perfil Actualizado' },
                  descripcion: { type: 'string', example: 'Nueva descripción' },
                  activo: { type: 'boolean', example: false }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Perfil actualizado' }
        }
      },
      delete: {
        summary: 'Eliminar perfil',
        tags: ['Perfiles'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        responses: {
          200: { description: 'Perfil eliminado' }
        }
      }
    },
    '/api/categorias': {
      get: {
        summary: 'Obtener todas las categorías',
        tags: ['Categorías'],
        responses: {
          200: {
            description: 'Lista de categorías',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Category' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Crear nueva categoría',
        tags: ['Categorías'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Nueva Categoría' },
                  descripcion: { type: 'string', example: 'Descripción' },
                  activo: { type: 'boolean', example: true }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Categoría creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' }
              }
            }
          }
        }
      }
    },
    '/api/categorias/{id}': {
      get: {
        summary: 'Obtener categoría por ID',
        tags: ['Categorías'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        responses: {
          200: {
            description: 'Categoría encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Category' }
              }
            }
          }
        }
      },
      put: {
        summary: 'Actualizar categoría',
        tags: ['Categorías'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Categoría Actualizada' },
                  descripcion: { type: 'string', example: 'Nueva descripción' },
                  activo: { type: 'boolean', example: false }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Categoría actualizada' }
        }
      },
      delete: {
        summary: 'Eliminar categoría',
        tags: ['Categorías'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            example: 1
          }
        ],
        responses: {
          200: { description: 'Categoría eliminada' }
        }
      }
    }
  }
};

module.exports = {
  specs,
  swaggerUi
};