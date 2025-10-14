# API Control - Express.js con Sequelize

Una API REST robusta construida con Express.js y Sequelize siguiendo principios de arquitectura limpia y escalable.

## 🚀 Características

- ✅ Arquitectura limpia y modular
- ✅ Operaciones CRUD completas
- ✅ Relaciones entre modelos con Sequelize
- ✅ Validación de datos con express-validator
- ✅ Documentación interactiva con Swagger UI
- ✅ Manejo de errores centralizado
- ✅ Configuración con variables de entorno
- ✅ Logging de requests
- ✅ CORS configurado
- ✅ Estructura escalable

## 📁 Estructura del Proyecto

```
Control/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Dependencias y scripts
├── .env.example          # Variables de entorno de ejemplo
├── config/
│   └── database.js       # Configuración de Sequelize
├── docs/
│   └── swagger.js        # Configuración de Swagger UI
├── models/
│   ├── index.js          # Configuración de relaciones
│   ├── ProfileModel.js   # Modelo de Perfiles
│   ├── CategoryModel.js  # Modelo de Categorías
│   ├── StateModel.js     # Modelo de Estados
│   ├── UserModel.js      # Modelo de Usuarios
│   └── NewModel.js       # Modelo de Noticias
├── controllers/
│   ├── ProfileController.js
│   ├── CategoryController.js
│   ├── StateController.js
│   ├── UserController.js
│   └── NewController.js
├── routes/
│   ├── ProfileRoute.js
│   ├── CategoryRoute.js
│   ├── StateRoute.js
│   ├── UserRoute.js
│   └── NewRoute.js
└── validators/
    └── StateValidator.js
```

## 🛠️ Instalación

1. **Clona o descarga el proyecto**
   ```bash
   cd Control
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

4. **Configura tu base de datos MySQL**
   - Crea una base de datos llamada `control_db`
   - Actualiza las credenciales en el archivo `.env`

5. **Prueba la conexión a la base de datos**
   ```bash
   npm run db:test
   ```

6. **Sincroniza los modelos (opcional)**
   ```bash
   npm run db:sync
   ```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## � Documentación Interactiva

Una vez iniciado el servidor, puedes acceder a la documentación interactiva de Swagger UI en:

**🔗 http://localhost:3000/api-docs**

La documentación incluye:
- ✅ Descripción detallada de todos los endpoints
- ✅ Esquemas de datos de request y response
- ✅ Ejemplos interactivos para probar la API
- ✅ Validaciones y códigos de error
- ✅ Información de relaciones entre modelos

## �📋 Endpoints Disponibles

### Perfiles
- `GET /api/perfiles` - Obtener todos los perfiles
- `GET /api/perfiles/:id` - Obtener perfil por ID
- `POST /api/perfiles` - Crear nuevo perfil
- `PUT /api/perfiles/:id` - Actualizar perfil
- `DELETE /api/perfiles/:id` - Eliminar perfil

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría

### Estados
- `GET /api/estados` - Obtener todos los estados
- `GET /api/estados/:id` - Obtener estado por ID
- `POST /api/estados` - Crear nuevo estado (con validación)
- `PUT /api/estados/:id` - Actualizar estado (con validación)
- `DELETE /api/estados/:id` - Eliminar estado

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios (con perfil)
- `GET /api/usuarios/:id` - Obtener usuario por ID (con perfil)
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Noticias
- `GET /api/noticias` - Obtener todas las noticias (con relaciones)
- `GET /api/noticias/:id` - Obtener noticia por ID (con relaciones)
- `POST /api/noticias` - Crear nueva noticia
- `PUT /api/noticias/:id` - Actualizar noticia
- `DELETE /api/noticias/:id` - Eliminar noticia

## 🔍 Ejemplos de Uso

### Crear un perfil
```bash
curl -X POST http://localhost:3000/api/perfiles \\
  -H "Content-Type: application/json" \\
  -d '{
    "nombre": "Administrador",
    "descripcion": "Perfil con acceso total",
    "activo": true,
    "useralta": "system"
  }'
```

### Obtener noticias con filtros
```bash
curl "http://localhost:3000/api/noticias?titulo=COVID&activo=true"
```

### Crear un estado (con validación)
```bash
curl -X POST http://localhost:3000/api/estados \\
  -H "Content-Type: application/json" \\
  -d '{
    "nombre": "Jalisco",
    "abreviacion": "JAL",
    "activo": true
  }'
```

## 🗄️ Modelos y Relaciones

### Relaciones implementadas:
- **User** pertenece a **Profile** (belongsTo)
- **Profile** tiene muchos **Users** (hasMany)
- **New** pertenece a **Category**, **State**, y **User** (belongsTo)
- **Category**, **State**, **User** tienen muchas **News** (hasMany)

### Campos comunes en todos los modelos:
- `id` - Clave primaria autoincremental
- `activo` - Estado activo/inactivo
- `fechaalta` - Fecha de creación
- `useralta` - Usuario que creó el registro

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor con nodemon para desarrollo
- `npm run db:test` - Prueba la conexión a la base de datos
- `npm run db:sync` - Sincroniza los modelos con la base de datos
- `npm test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter
- `npm run lint:fix` - Corrige automáticamente errores de linting

## 🛡️ Validaciones

El modelo **State** incluye validaciones con express-validator:
- Nombre requerido (2-100 caracteres, solo letras)
- Abreviación requerida (1-10 caracteres, solo mayúsculas)
- Campos opcionales validados apropiadamente

## 📦 Dependencias Principales

- **express**: Framework web
- **sequelize**: ORM para base de datos
- **mysql2**: Driver de MySQL
- **express-validator**: Validación de datos
- **swagger-jsdoc**: Generación de documentación OpenAPI
- **swagger-ui-express**: Interfaz interactiva de documentación
- **cors**: Configuración de CORS
- **dotenv**: Manejo de variables de entorno

## 🔮 Próximas Mejoras

- [ ] Autenticación JWT
- [ ] Paginación en endpoints
- [ ] Documentación con Swagger
- [ ] Tests unitarios y de integración
- [ ] Rate limiting
- [ ] Compresión de respuestas
- [ ] Logs estructurados

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado siguiendo las mejores prácticas de arquitectura limpia y escalable con Express.js y Sequelize.