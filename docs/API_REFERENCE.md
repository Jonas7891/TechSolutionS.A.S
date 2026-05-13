# Referencia de API - TechSolutions

## Base URL
```
http://localhost:4000/api
```

## Autenticación

### POST /auth/login
Inicia sesión con credenciales

**Request:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "demo@example.com",
    "name": "demo",
    "role": "admin",
    "token": "token_1234567890"
  }
}
```

**Errores:**
- `400`: Credenciales inválidas o campos faltantes
- `401`: Email o contraseña incorrectos

---

### POST /auth/register
Registra un nuevo usuario

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "1234567890",
    "email": "newuser@example.com",
    "name": "newuser",
    "role": "user",
    "token": "token_1234567890"
  }
}
```

**Errores:**
- `400`: Validación falló (contraseñas no coinciden, email inválido)
- `409`: Email ya está registrado

---

## Eventos

### GET /events
Obtiene la lista de eventos

**Query Parameters:**
- `upcoming` (boolean, opcional): Si es `true`, retorna solo eventos futuros
- `past` (boolean, opcional): Si es `true`, retorna solo eventos pasados

**Ejemplos:**
```
GET /events                    // Todos los eventos
GET /events?upcoming=true      // Solo eventos futuros
GET /events?past=true          // Solo eventos pasados
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Seminario de innovación educativa",
    "date": "2026-06-15",
    "description": "Explora las últimas tendencias en innovación educativa.",
    "location": "Sala 201 - Edificio A",
    "capacity": 50
  },
  {
    "id": 2,
    "title": "Taller de desarrollo de proyectos",
    "date": "2026-07-05",
    "description": "Aprende a desarrollar y gestionar proyectos educativos.",
    "location": "Laboratorio de Sistemas",
    "capacity": 30
  }
]
```

---

### GET /events/:id
Obtiene un evento específico por ID

**Parameters:**
- `id` (number): ID del evento

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Seminario de innovación educativa",
  "date": "2026-06-15",
  "description": "Explora las últimas tendencias...",
  "location": "Sala 201 - Edificio A",
  "capacity": 50
}
```

**Errores:**
- `404`: Evento no encontrado

---

### POST /events
Crea un nuevo evento

**Request:**
```json
{
  "title": "Mi nuevo evento",
  "date": "2026-08-20",
  "description": "Descripción del evento",
  "location": "Sala 101",
  "capacity": 40
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "title": "Mi nuevo evento",
  "date": "2026-08-20",
  "description": "Descripción del evento",
  "location": "Sala 101",
  "capacity": 40
}
```

**Validaciones:**
- ✓ `title` es requerido
- ✓ `date` es requerido
- ✓ La fecha no puede ser en el pasado
- ✓ `capacity` debe ser un número si se proporciona

**Errores:**
- `400`: Validación falló
  - Título o fecha faltantes
  - Fecha en el pasado
  - Capacidad no es un número

---

### PUT /events/:id
Actualiza un evento existente

**Parameters:**
- `id` (number): ID del evento

**Request:**
```json
{
  "title": "Evento actualizado",
  "date": "2026-08-25",
  "description": "Nueva descripción",
  "location": "Nueva ubicación",
  "capacity": 60
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Evento actualizado",
  "date": "2026-08-25",
  "description": "Nueva descripción",
  "location": "Nueva ubicación",
  "capacity": 60
}
```

**Validaciones:**
- Mismas validaciones que POST /events
- Todos los campos son opcionales

**Errores:**
- `404`: Evento no encontrado
- `400`: Validación falló

---

### DELETE /events/:id
Elimina un evento

**Parameters:**
- `id` (number): ID del evento

**Response (200 OK):**
```json
{
  "message": "Evento eliminado correctamente",
  "event": {
    "id": 1,
    "title": "Seminario de innovación educativa",
    "date": "2026-06-15",
    "description": "...",
    "location": "Sala 201",
    "capacity": 50
  }
}
```

**Errores:**
- `404`: Evento no encontrado

---

### GET /events/stats/summary
Obtiene estadísticas de los eventos

**Response (200 OK):**
```json
{
  "total": 3,
  "upcoming": 2,
  "past": 1,
  "totalCapacity": 180,
  "averageCapacity": 60
}
```

**Descripción de campos:**
- `total`: Número total de eventos
- `upcoming`: Cantidad de eventos futuros
- `past`: Cantidad de eventos pasados
- `totalCapacity`: Suma de capacidades de todos los eventos
- `averageCapacity`: Promedio de capacidad por evento

---

## Salud del Servicio

### GET /health
Verifica el estado del backend

**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "TechSolutions Eventos Académicos"
}
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - No autenticado |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: email duplicado) |
| 500 | Server Error - Error en el servidor |

---

## Headers Requeridos

```
Content-Type: application/json
```

---

## Ejemplos de Uso con JavaScript

### Obtener eventos
```javascript
const response = await fetch('http://localhost:4000/api/events');
const events = await response.json();
console.log(events);
```

### Crear evento
```javascript
const response = await fetch('http://localhost:4000/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nuevo Evento',
    date: '2026-08-20',
    description: 'Descripción...',
    location: 'Sala 101',
    capacity: 50
  })
});
const newEvent = await response.json();
```

### Login
```javascript
const response = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'demo@example.com',
    password: 'demo123'
  })
});
const data = await response.json();
console.log(data.user.token); // Guardar para futuras peticiones
```

---

## Notas Importantes

- Todos los endpoints retornan JSON
- Las fechas están en formato ISO 8601 (YYYY-MM-DD)
- Los IDs son números enteros generados automáticamente
- Los datos se almacenan en memoria (se pierden al reiniciar el servidor)
- Para producción, usar una base de datos persistente

---

**Última actualización**: Mayo 2026
