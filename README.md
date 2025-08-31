# dev-tree-backend

Backend project in Node.js with Express and TypeScript for user management, registration, and authentication, using MongoDB as the database.

---

## English

### Installation

```bash
npm install
```

### Scripts

- `npm run dev`: Starts the server in development mode with nodemon.
- `npm run build`: Compiles the TypeScript project to JavaScript.
- `npm start`: Runs the compiled server.

### Libraries Used

#### Main Dependencies

- **express**: Framework to create the HTTP server and define routes.
- **mongoose**: ODM to interact with MongoDB in a simple and typed way.
- **dotenv**: Loads environment variables from a `.env` file.
- **bcrypt**: For securely hashing and comparing passwords.
- **express-validator**: Middleware to validate and sanitize request data.
- **slug**: Generates slugs (unique, readable identifiers) from strings, used for the user `handle` field.
- **colors**: Colors console log output for better readability.

#### Development Dependencies

- **typescript**: Adds static typing and development tools for TypeScript.
- **ts-node**: Allows running TypeScript files directly.
- **nodemon**: Automatically restarts the server on code changes.
- **@types/***: TypeScript types for the used libraries.

### Project Structure

- `src/index.ts`: Entry point, starts the server.
- `src/server.ts`: Express configuration and database connection.
- `src/router.ts`: Main routes (register and login).
- `src/handlers/`: Controllers for registration and authentication logic.
- `src/models/`: Data models (e.g., User).
- `src/utils/`: Utilities like password hashing and comparison functions.
- `src/middleware/`: Custom middlewares (e.g., validations).

### Main Endpoints

- `POST /auth/register`: User registration.
- `POST /auth/login`: User login.

---

## Español

### Instalación

```bash
npm install
```

### Scripts

- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.
- `npm run build`: Compila el proyecto TypeScript a JavaScript.
- `npm start`: Ejecuta el servidor compilado.

### Librerías utilizadas

#### Dependencias principales

- **express**: Framework para crear el servidor HTTP y definir rutas.
- **mongoose**: ODM para interactuar con MongoDB de forma sencilla y tipada.
- **dotenv**: Permite cargar variables de entorno desde un archivo `.env`.
- **bcrypt**: Para hashear y comparar contraseñas de forma segura.
- **express-validator**: Middleware para validar y sanitizar datos de las peticiones.
- **slug**: Genera slugs (identificadores únicos y legibles) a partir de strings, usado para el campo `handle` de usuario.
- **colors**: Permite colorear la salida de logs en consola para mejor legibilidad.

#### Dependencias de desarrollo

- **typescript**: Añade tipado estático y herramientas de desarrollo para TypeScript.
- **ts-node**: Permite ejecutar archivos TypeScript directamente.
- **nodemon**: Reinicia automáticamente el servidor al detectar cambios en el código fuente.
- **@types/***: Tipos TypeScript para las librerías utilizadas.

### Estructura del proyecto

- `src/index.ts`: Punto de entrada, arranca el servidor.
- `src/server.ts`: Configuración de Express y conexión a la base de datos.
- `src/router.ts`: Define las rutas principales (registro y login).
- `src/handlers/`: Controladores para la lógica de registro y autenticación.
- `src/models/`: Modelos de datos (ej. Usuario).
- `src/utils/`: Utilidades como funciones de hash y comparación de contraseñas.
- `src/middleware/`: Middlewares personalizados (ej. validaciones).

### Endpoints principales

- `POST /auth/register`: Registro de usuario.
- `POST /auth/login`: Login de usuario.

---

Feel free to contribute or suggest improvements!

¡No dudes en contribuir o sugerir mejoras!
