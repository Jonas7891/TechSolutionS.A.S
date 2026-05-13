# TechSolutions Academic Events Platform

Plataforma de gestión de eventos académicos con autenticación funcional y validaciones en backend.

## 🎯 Estado del Proyecto

✅ **Completado y Funcional**
- Sistema de autenticación (login y registro)
- Validaciones de entrada en backend
- API REST con Express.js
- Frontend React con Context API
- CORS habilitado para comunicación frontend-backend

## 🏗️ Estructura del proyecto

```
├── docs/                          # Documentación
├── README.md                       # Este archivo
├── SETUP.md                        # Instrucciones de instalación
├── PROJECT_STATUS.md               # Cambios completados
└── src/
    ├── backend/                    # API Node.js + Express
    │   ├── src/
    │   │   ├── app.js             # Configuración principal
    │   │   ├── routes/
    │   │   │   ├── auth.js        # Rutas de autenticación ✨ NUEVO
    │   │   │   └── events.js      # Rutas de eventos
    │   │   └── utils/
    │   │       └── validators.js  # Validadores ✨ NUEVO
    │   └── package.json
    └── frontend/                   # Aplicación React
        ├── public/
        │   └── index.html
        └── src/
            ├── App.jsx
            ├── context/
            │   └── AuthContext.jsx # Context con API real ✨ ACTUALIZADO
            ├── features/
            │   └── login/          # Componentes de autenticación
            └── hooks/
                └── useAuth.js

```

## 🚀 Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   cd src/backend && npm install
   cd ../frontend && npm install
   ```

2. **Iniciar el backend** (Terminal 1):
   ```bash
   cd src/backend
   npm start
   ```

3. **Iniciar el frontend** (Terminal 2):
   ```bash
   cd src/frontend
   npm start
   ```

4. **Credenciales de demostración**:
   - Email: `demo@example.com`
   - Contraseña: `demo123`

## 🔐 Sistema de Autenticación

### Backend (Node.js + Express)

**Endpoints:**
- `POST /api/auth/login` - Autentica usuario
- `POST /api/auth/register` - Registra nuevo usuario

**Validaciones:**
- Email: requerido y con formato válido (@)
- Contraseña: mínimo 6 caracteres
- Confirmación de contraseña: coincide con contraseña (solo registro)

**Respuestas:**
```json
// Login exitoso
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

// Error
{
  "error": "El email y la contraseña son requeridos"
}
```

### Frontend (React)

- Context API para gestión de estado
- Hook personalizado `useAuth()` para acceso a funciones
- Manejo de errores y estados de carga
- Almacenamiento en localStorage

## 📝 Flujo recomendado de Git

1. Crear una rama para cada tarea: `feature/nombre-tarea`.
2. Trabajar localmente y registrar cambios con `git add` + `git commit`.
3. Subir la rama a GitHub: `git push origin feature/nombre-tarea`.
4. Crear Pull Request para revisión.
5. Mergear a `main` después de aprobación.

## 📚 Documentación Adicional

- [SETUP.md](./SETUP.md) - Instrucciones detalladas de configuración
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Cambios completados
- [docs/architecture.md](./docs/architecture.md) - Arquitectura del proyecto
- [docs/contributing.md](./docs/contributing.md) - Guía de contribución
