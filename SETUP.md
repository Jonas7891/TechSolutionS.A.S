# 🔧 Guía de Configuración - TechSolutions Academic Events

Instrucciones paso a paso para configurar y ejecutar el proyecto en tu máquina local.

## 📋 Requisitos Previos

- **Node.js** v14+ ([Descargar](https://nodejs.org/))
- **npm** v6+ (incluido con Node.js)
- Un editor de código (VS Code, WebStorm, etc.)

## 🚀 Instalación

### 1. Clonar o descargar el repositorio

```bash
git clone <url-repositorio>
cd TechSolutionS.A.S
```

### 2. Instalar dependencias del backend

```bash
cd src/backend
npm install
```

**Paquetes instalados:**
- `express` - Framework web
- `cors` - Habilitador de CORS
- `nodemon` (opcional) - Recarga automática en desarrollo

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

**Paquetes principales:**
- `react` - Librería UI
- `react-router-dom` - Enrutamiento
- `react-dom` - DOM de React

## 🎮 Ejecución

### Opción 1: Dos terminales (Recomendado para desarrollo)

**Terminal 1 - Backend:**
```bash
cd src/backend
npm start
```
✅ El backend estará disponible en: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd src/frontend
npm start
```
✅ El frontend se abrirá automáticamente en: `http://localhost:3000`

### Opción 2: Un script combinado (si lo deseas)

Puedes crear un script `start-dev.sh` (macOS/Linux) o `start-dev.bat` (Windows) que inicie ambos simultáneamente.

## 🧪 Pruebas de Autenticación

### Credenciales de Demostración

```
Email:      demo@example.com
Contraseña: demo123
```

### Casos de Prueba

#### ✅ Login Exitoso
1. Email: `demo@example.com`
2. Contraseña: `demo123`
3. Resultado: Redirige a página principal

#### ❌ Errores de Validación
- **Email vacío**: "El email es requerido"
- **Email inválido**: "Por favor ingrese un email válido"
- **Contraseña vacía**: "La contraseña es requerida"
- **Contraseña muy corta**: "La contraseña debe tener al menos 6 caracteres"
- **Credenciales incorrectas**: "Email o contraseña incorrectos"

#### 📝 Registro de Nuevo Usuario
1. Ir a página de registro
2. Ingresar email y contraseña
3. Confirmar contraseña
4. El usuario se registra y puede hacer login

## 📱 Estructura de Respuestas de API

### Login - POST `/api/auth/login`

**Request:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response (Exitoso - 200):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "demo@example.com",
    "name": "demo",
    "role": "admin",
    "token": "token_1715614800000"
  }
}
```

**Response (Error - 400/401):**
```json
{
  "error": "Email o contraseña incorrectos"
}
```

### Register - POST `/api/auth/register`

**Request:**
```json
{
  "email": "nuevo@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (Exitoso - 201):**
```json
{
  "success": true,
  "user": {
    "id": "1715614800000",
    "email": "nuevo@example.com",
    "name": "nuevo",
    "role": "user",
    "token": "token_1715614800001"
  }
}
```

## 🛠️ Desarrollo

### Archivo Principal del Backend
```
src/backend/src/app.js
```

### Rutas Disponibles
- **Autenticación**: `src/backend/src/routes/auth.js`
- **Eventos**: `src/backend/src/routes/events.js`

### Validadores
```
src/backend/src/utils/validators.js
```

### Context del Frontend
```
src/frontend/src/context/AuthContext.jsx
```

## 🐛 Solución de Problemas

### Error: "CORS policy"
**Solución**: Asegúrate que el backend está corriendo en `http://localhost:4000`

### Error: "Cannot find module 'cors'"
**Solución**: Ejecuta `npm install cors` en la carpeta backend

### Puerto 4000 ya está en uso
**Solución**: Cambia el puerto en `src/backend/src/app.js`
```javascript
const PORT = process.env.PORT || 5000; // Cambiar a otro puerto
```

### Frontend no se conecta al backend
**Solución**: Verifica que la URL en `AuthContext.jsx` sea correcta:
```javascript
fetch('http://localhost:4000/api/auth/login', ...)
```

## 📦 Estructura de Carpetas del Proyecto

```
src/
├── backend/
│   ├── node_modules/          # Dependencias instaladas
│   ├── src/
│   │   ├── app.js             # Archivo principal
│   │   ├── routes/
│   │   │   ├── auth.js        # Rutas de autenticación
│   │   │   └── events.js      # Rutas de eventos
│   │   └── utils/
│   │       └── validators.js  # Funciones de validación
│   └── package.json
│
└── frontend/
    ├── node_modules/          # Dependencias instaladas
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── App.jsx
    │   ├── index.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── features/
    │   │   └── login/
    │   │       ├── LoginPage.jsx
    │   │       ├── LoginForm.jsx
    │   │       ├── RegisterForm.jsx
    │   │       ├── login.css
    │   │       └── README.md
    │   ├── hooks/
    │   │   └── useAuth.js
    │   └── styles/
    │       └── global.css
    └── package.json
```

## 🎓 Próximos Pasos

1. Implementar hash de contraseñas (bcrypt)
2. Agregar JWT para tokens
3. Implementar persistencia con base de datos
4. Agregar rutas protegidas
5. Mejorar UI/UX

---

**Última actualización**: Mayo 2026
