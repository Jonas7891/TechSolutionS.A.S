# Módulo de Login - Documentación

## 📋 Descripción General

El módulo de login proporciona autenticación completa para la aplicación TechSolutions. Incluye:
- ✅ Formulario de login con validaciones
- ✅ Formulario de registro/signup
- ✅ Gestión de estado de autenticación con Context API
- ✅ Hook personalizado `useAuth()` para acceder a la autenticación
- ✅ Rutas protegidas
- ✅ Interfaz responsiva y moderna

## 📁 Estructura de Carpetas

```
src/
├── features/
│   └── login/
│       ├── LoginPage.jsx          # Página principal con switch login/registro
│       ├── LoginForm.jsx          # Componente del formulario de login
│       ├── RegisterForm.jsx       # Componente del formulario de registro
│       ├── login.css              # Estilos del módulo
│       └── index.js               # Exportaciones
├── context/
│   └── AuthContext.jsx            # Context y provider de autenticación
├── hooks/
│   └── useAuth.js                 # Hook personalizado para usar auth
└── styles/
    └── global.css                 # Estilos globales
```

## 🚀 Uso Básico

### 1. AuthProvider (Ya está configurado en App.jsx)

```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Tu aplicación aquí */}
    </AuthProvider>
  );
}
```

### 2. Hook useAuth() en Componentes

```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bienvenido, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  );
}
```

## 🔐 API del AuthContext

### Estado
- `user` - Objeto del usuario autenticado o null
- `isAuthenticated` - Boolean indicando si hay usuario autenticado
- `isLoading` - Boolean indicando si hay una operación en progreso
- `error` - String con el mensaje de error o null

### Métodos

#### `login(email, password)`
Inicia sesión con email y contraseña.

```jsx
const { login } = useAuth();

try {
  const user = await login('user@example.com', 'password123');
  console.log('Usuario:', user);
} catch (error) {
  console.error('Error:', error.message);
}
```

**Validaciones:**
- Email requerido y con formato válido
- Contraseña mínimo 6 caracteres

#### `register(email, password, confirmPassword)`
Registra un nuevo usuario.

```jsx
const { register } = useAuth();

try {
  const user = await register('user@example.com', 'password123', 'password123');
  console.log('Registro exitoso:', user);
} catch (error) {
  console.error('Error:', error.message);
}
```

**Validaciones:**
- Email requerido y con formato válido
- Las contraseñas deben coincidir
- Contraseña mínimo 6 caracteres

#### `logout()`
Cierra la sesión actual y limpia el estado.

```jsx
const { logout } = useAuth();

logout();
```

## 🎨 Componentes Principales

### LoginPage
Página principal que contiene:
- Header con branding
- Switch entre login/registro
- Muestra información del usuario cuando está autenticado

```jsx
import { LoginPage } from './features/login';

<Route path="/login" element={<LoginPage />} />
```

### LoginForm
Formulario de inicio de sesión con:
- Campo de email
- Campo de contraseña con toggle de visibilidad
- Mostrador de estado de carga
- Mensajes de error
- Credenciales de demostración

### RegisterForm
Formulario de registro con:
- Campo de email
- Campo de contraseña
- Campo de confirmación de contraseña
- Toggles de visibilidad
- Validaciones

## 🔒 Rutas Protegidas

Las rutas protegidas se configuran con el componente `ProtectedRoute`:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

Si un usuario no autenticado intenta acceder, será redirigido a `/login`.

## 💾 Persistencia

El usuario se guarda en `localStorage` bajo la clave `user`. Esto permite que la sesión persista al recargar la página.

```javascript
// El usuario se guarda automáticamente
localStorage.setItem('user', JSON.stringify(userData));

// Para recuperar:
const savedUser = localStorage.getItem('user');
```

## 📱 Credenciales de Demostración

Para probar el módulo de login:
- **Email:** demo@example.com
- **Contraseña:** demo123

Estas credenciales se muestran en el formulario. Cualquier email con @ y contraseña de 6+ caracteres funcionará en la simulación.

## 🎯 Próximas Implementaciones

1. **Integración con Backend:**
   - Reemplazar las simulaciones en `AuthContext.jsx` con llamadas reales al API
   - Guardar tokens JWT en lugar de datos simples
   - Configurar interceptores de solicitudes

2. **Mejoras de Seguridad:**
   - Implementar refresh token
   - CSRF protection
   - Rate limiting
   - Encrypted storage

3. **Funcionalidades Adicionales:**
   - Recuperación de contraseña
   - Verificación de email
   - OAuth (Google, GitHub, etc.)
   - Two-factor authentication

## 🧪 Testing

Para probar manualmente:

1. **Login:**
   - Ingresa un email válido y contraseña (6+ caracteres)
   - El formulario simulará un delay de 1 segundo
   - Serás redirigido al dashboard

2. **Register:**
   - Ingresa datos nuevos
   - Las contraseñas deben coincidir
   - Se creará un usuario con rol 'user'

3. **Logout:**
   - Haz click en "Cerrar Sesión"
   - Serás redirigido a login
   - Los datos se limpian de localStorage

4. **Errores:**
   - Intenta email sin @
   - Intenta contraseña corta
   - Intenta registrarte con contraseñas que no coinciden

## 📚 Recursos

- [React Router v6](https://reactrouter.com/)
- [Context API - React](https://react.dev/reference/react/useContext)
- [React Hooks](https://react.dev/reference/react)

---

**Módulo creado:** Mayo 2026  
**Versión:** 1.0.0  
**Estado:** 🚀 Implementación completada
