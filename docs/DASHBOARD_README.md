# Dashboard Interactiva - Gestión de Eventos Académicos

## 📋 Descripción

Se ha creado una dashboard moderna, interactiva y funcional que integra completamente con el backend. La aplicación permite gestionar eventos académicos con una interfaz intuitiva y responsiva.

## ✨ Características Principales

### 1. **Interfaz Moderna y Responsiva**
- Diseño limpio con gradientes y animaciones suaves
- Completamente responsivo (móvil, tablet, desktop)
- Navegación por pestañas intuitiva

### 2. **Gestión de Eventos**
- 📅 **Ver Eventos**: Lista completa con tarjetas interactivas
- ➕ **Crear Eventos**: Formulario con validaciones en tiempo real
- 🔄 **Actualizar Eventos**: Editar información de eventos existentes
- 🗑️ **Eliminar Eventos**: Remover eventos de la lista

### 3. **Dashboard Interactivo**
- **Resumen**: Vista general con estadísticas clave
  - Total de eventos
  - Eventos próximos
  - Eventos realizados
  - Rol del usuario
- **Próximos Eventos**: Preview de los próximos eventos
- **Información Completa**: Fecha, ubicación, capacidad, descripción

### 4. **Autenticación**
- Sistema de login/registro
- Control de roles (Admin/Usuario)
- Funcionalidades diferenciadas por rol
- Información del usuario en el header

## 🚀 Cómo Usar

### Iniciar la Aplicación

#### Backend
```bash
cd src/backend
npm install
npm start
```
Backend estará disponible en: `http://localhost:4000`

#### Frontend
```bash
cd src/frontend
npm install
npm start
```
Frontend estará disponible en: `http://localhost:3000`

### Credenciales de Prueba

**Admin:**
- Email: `demo@example.com`
- Password: `demo123`

### Navegación Principal

1. **Resumen (📊)**
   - Visualiza estadísticas generales
   - Ve los próximos eventos
   - Revisa información del usuario

2. **Eventos (📅)**
   - Visualiza todos los eventos registrados
   - Ve detalles completos (fecha, ubicación, capacidad)
   - Interactúa con cada evento

3. **Crear Evento (➕)** *Solo para Administradores*
   - Completa el formulario con los detalles del evento
   - Validaciones automáticas
   - Mensaje de confirmación al crear

## 📁 Estructura de Carpetas

```
src/
├── frontend/
│   └── src/
│       ├── components/          # Componentes reutilizables
│       │   ├── EventCard.jsx       # Tarjeta de evento
│       │   ├── EventForm.jsx       # Formulario de creación
│       │   └── StatCard.jsx        # Tarjeta de estadísticas
│       ├── pages/
│       │   └── DashboardPage.jsx   # Página principal
│       ├── services/
│       │   └── api.js              # Servicio API
│       └── styles/
│           ├── Dashboard.css       # Estilos de dashboard
│           ├── EventCard.css       # Estilos de tarjetas
│           ├── EventForm.css       # Estilos de formulario
│           └── StatCard.css        # Estilos de estadísticas
└── backend/
    └── src/
        └── routes/
            └── events.js           # Endpoints de eventos (mejorados)
```

## 🔌 API Endpoints

### Eventos

#### GET /api/events
Obtiene la lista de eventos
- **Query Params**: 
  - `upcoming` (true): solo eventos futuros
  - `past` (true): solo eventos pasados
- **Response**: Array de eventos

```json
[
  {
    "id": 1,
    "title": "Seminario de innovación educativa",
    "date": "2026-06-15",
    "description": "Explora las últimas tendencias...",
    "location": "Sala 201 - Edificio A",
    "capacity": 50
  }
]
```

#### POST /api/events
Crea un nuevo evento
- **Body**:
  ```json
  {
    "title": "Nombre del evento",
    "date": "2026-06-15",
    "description": "Descripción opcional",
    "location": "Ubicación opcional",
    "capacity": 50
  }
  ```

#### GET /api/events/:id
Obtiene un evento específico

#### PUT /api/events/:id
Actualiza un evento existente

#### DELETE /api/events/:id
Elimina un evento

#### GET /api/events/stats/summary
Obtiene estadísticas generales
```json
{
  "total": 3,
  "upcoming": 2,
  "past": 1,
  "totalCapacity": 180,
  "averageCapacity": 60
}
```

## 🎨 Componentes Principales

### EventCard
Muestra información de un evento en formato de tarjeta
- Props: `event`, `onDelete`
- Indica si el evento es próximo o pasado
- Información: Título, fecha, ubicación, capacidad

### EventForm
Formulario para crear nuevos eventos
- Props: `onSubmit`, `isLoading`
- Validaciones en tiempo real
- Campos: Título (requerido), Fecha (requerido), Ubicación, Capacidad, Descripción

### StatCard
Tarjeta de estadística
- Props: `icon`, `label`, `value`, `color`
- Colores: blue, green, purple, orange

## 🎯 Características Destacadas

### Validaciones
- ✓ Título y fecha son obligatorios
- ✓ La fecha no puede ser en el pasado
- ✓ Capacidad debe ser un número válido
- ✓ Mensajes de error claros y útiles

### Estados de Eventos
- **Próximos**: Color verde, badge "Próximo"
- **Pasados**: Color gris, badge "Pasado"
- Visual diferenciado en las tarjetas

### Mensajes de Retroalimentación
- Alertas de éxito al crear eventos
- Alertas de error con detalles
- Estados de carga durante peticiones

### Responsividad
- Layout adaptativo
- Navegación móvil optimizada
- Grid dinámico para eventos
- Optimizado para pantallas pequeñas

## 🔐 Control de Acceso

- **Administradores**: Acceso completo (crear, editar, eliminar eventos)
- **Usuarios**: Solo visualización de eventos

## 💡 Próximas Mejoras (Sugerencias)

1. **Edición de Eventos**: Permitir administradores editar eventos
2. **Búsqueda y Filtros**: Buscar eventos por nombre, fecha, ubicación
3. **Paginación**: Para listas grandes de eventos
4. **Exportar Datos**: Descargar lista de eventos en PDF/Excel
5. **Notificaciones**: Recordatorios de eventos próximos
6. **Galería**: Agregar imágenes a los eventos
7. **Comentarios**: Sistema de comentarios en eventos
8. **Asistentes**: Registro de asistentes a eventos

## 📊 Variables de Entorno

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:4000/api
```

### Backend (.env)
```
PORT=4000
NODE_ENV=development
```

## 🐛 Troubleshooting

### Error de conexión con el backend
1. Verifica que el backend esté corriendo en `http://localhost:4000`
2. Revisa la consola del navegador para más detalles
3. Asegúrate de que CORS está habilitado en el backend

### Formulario no responde
1. Verifica que no haya errores en la consola
2. Completa todos los campos requeridos (marcados con *)
3. Asegúrate de que la fecha sea válida y en el futuro

### Eventos no se cargan
1. Verifica la conexión del backend
2. Abre la consola del navegador (F12)
3. Revisa el tab Network para las peticiones a `/api/events`

## 📝 Notas Técnicas

- **Frontend**: React 18+ con React Router
- **Backend**: Express.js con CORS habilitado
- **Estilos**: CSS puro con enfoque mobile-first
- **API**: REST completa con endpoints CRUD
- **Validaciones**: Validaciones tanto en cliente como en servidor

## 👨‍💻 Autor

Dashboard desarrollada para TechSolutions S.A.S - Gestión de Eventos Académicos

---

**Última actualización**: Mayo 2026
