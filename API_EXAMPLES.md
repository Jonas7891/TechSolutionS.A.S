# 🔐 Guía de Uso de la API de Autenticación

Ejemplos prácticos de cómo usar los endpoints de autenticación.

---

## 📌 URL Base

```
http://localhost:4000/api
```

---

## 1️⃣ Login - POST `/api/auth/login`

### Solicitud Exitosa

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "demo123"
  }'
```

**Respuesta (200 OK)**:
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "demo@example.com",
    "name": "demo",
    "role": "admin",
    "token": "token_1715614800123"
  }
}
```

### Error - Email no encontrado

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "noexiste@example.com",
    "password": "demo123"
  }'
```

**Respuesta (401 Unauthorized)**:
```json
{
  "error": "Email o contraseña incorrectos"
}
```

### Error - Email vacío

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "",
    "password": "demo123"
  }'
```

**Respuesta (400 Bad Request)**:
```json
{
  "error": "El email es requerido"
}
```

### Error - Email inválido

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "emailsinvalido",
    "password": "demo123"
  }'
```

**Respuesta (400 Bad Request)**:
```json
{
  "error": "Por favor ingrese un email válido"
}
```

### Error - Contraseña muy corta

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "123"
  }'
```

**Respuesta (400 Bad Request)**:
```json
{
  "error": "La contraseña debe tener al menos 6 caracteres"
}
```

---

## 2️⃣ Registro - POST `/api/auth/register`

### Solicitud Exitosa

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Respuesta (201 Created)**:
```json
{
  "success": true,
  "user": {
    "id": "1715614800456",
    "email": "nuevo@example.com",
    "name": "nuevo",
    "role": "user",
    "token": "token_1715614800789"
  }
}
```

### Error - Email ya existe

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Respuesta (409 Conflict)**:
```json
{
  "error": "Este email ya está registrado"
}
```

### Error - Contraseñas no coinciden

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "password123",
    "confirmPassword": "diferente123"
  }'
```

**Respuesta (400 Bad Request)**:
```json
{
  "error": "Las contraseñas no coinciden"
}
```

### Error - Campos requeridos

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "",
    "confirmPassword": ""
  }'
```

**Respuesta (400 Bad Request)**:
```json
{
  "error": "La contraseña es requerida"
}
```

---

## 💻 Ejemplos en JavaScript (Frontend)

### Usando Fetch API

#### Login

```javascript
async function login(email, password) {
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    // Guardar usuario
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('Login exitoso:', data.user);
    return data.user;
  } catch (error) {
    console.error('Error en login:', error.message);
    throw error;
  }
}

// Uso
login('demo@example.com', 'demo123')
  .then(user => console.log('Usuario autenticado:', user))
  .catch(err => console.error(err));
```

#### Registro

```javascript
async function register(email, password, confirmPassword) {
  try {
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    // Guardar usuario
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('Registro exitoso:', data.user);
    return data.user;
  } catch (error) {
    console.error('Error en registro:', error.message);
    throw error;
  }
}

// Uso
register('nuevo@example.com', 'password123', 'password123')
  .then(user => console.log('Usuario registrado:', user))
  .catch(err => console.error(err));
```

### Usando Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

async function register(email, password, confirmPassword) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      confirmPassword,
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
```

---

## 🧪 Tabla de Validaciones

| Campo | Validación | Mensaje de Error |
|-------|-----------|------------------|
| Email (Login) | Requerido | "El email es requerido" |
| Email (Login) | Formato válido | "Por favor ingrese un email válido" |
| Password (Login) | Requerida | "La contraseña es requerida" |
| Password (Login) | Mínimo 6 caracteres | "La contraseña debe tener al menos 6 caracteres" |
| Email (Registro) | Requerido | "El email es requerido" |
| Email (Registro) | Formato válido | "Por favor ingrese un email válido" |
| Password (Registro) | Requerida | "La contraseña es requerida" |
| Password (Registro) | Mínimo 6 caracteres | "La contraseña debe tener al menos 6 caracteres" |
| ConfirmPassword (Registro) | Requerida | "La confirmación de contraseña es requerida" |
| ConfirmPassword (Registro) | Coincide con Password | "Las contraseñas no coinciden" |
| Email (Registro) | No duplicado | "Este email ya está registrado" |
| Credenciales (Login) | Válidas | "Email o contraseña incorrectos" |

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Cuando Ocurre |
|--------|------------|---------------|
| 200 | OK | Login exitoso |
| 201 | Created | Registro exitoso |
| 400 | Bad Request | Validación fallida |
| 401 | Unauthorized | Credenciales incorrectas |
| 409 | Conflict | Email ya registrado |

---

## 🔒 Datos de Sesión

### Token Generado

Después del login/registro exitoso, se recibe un token:

```json
{
  "token": "token_1715614800123"
}
```

**Formato**: `token_` + timestamp Unix en milisegundos

**Uso**: Almacenar en `localStorage` para identificar sesión del usuario

### Estructura del Usuario

```javascript
{
  "id": "1",                              // ID único
  "email": "demo@example.com",            // Email del usuario
  "name": "demo",                         // Nombre derivado del email
  "role": "admin" | "user",               // Rol del usuario
  "token": "token_1715614800123"          // Token de sesión
}
```

---

## 📝 Notas

- Las contraseñas se envían en texto plano durante la solicitud (usar HTTPS en producción)
- El token es un identificador simple (usar JWT en producción)
- Los usuarios se guardan en memoria (se pierden al reiniciar el servidor)
- No hay cifrado de contraseñas (implementar bcrypt en producción)

---

**Última actualización**: Mayo 2026
