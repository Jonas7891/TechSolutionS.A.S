# 🚀 Guía Rápida de Inicio

## Requisitos Previos

- **Node.js** v14+ (descargar desde https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

---

## ⚡ Inicio Rápido

### Opción 1: Automático (Windows)
```bash
start-dev.bat
```

### Opción 2: Automático (Mac/Linux)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Opción 3: Manual

#### 1. Iniciar el Backend
```bash
cd src/backend
npm install
npm start
```

El backend estará disponible en: **http://localhost:4000**

#### 2. Iniciar el Frontend (en otra terminal)
```bash
cd src/frontend
npm install
npm start
```

El frontend estará disponible en: **http://localhost:3000**

---

## 🔑 Credenciales de Prueba

| Campo | Valor |
|-------|-------|
| Email | `demo@example.com` |
| Password | `demo123` |
| Rol | Administrador |

---

## 📍 URLs Importantes

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:4000 |
| API Base | http://localhost:4000/api |
| Health Check | http://localhost:4000/api/health |

---

## 📚 Documentación

- **Dashboard Completa**: [docs/DASHBOARD_README.md](./DASHBOARD_README.md)
- **API Reference**: [docs/API_REFERENCE.md](./API_REFERENCE.md)
- **Arquitectura**: [docs/architecture.md](./architecture.md)
- **Guía de Contribución**: [docs/contributing.md](./contributing.md)

---

## 🛠️ Solución de Problemas

### Error: "Port already in use"
El puerto 3000 o 4000 está siendo usado por otra aplicación.

**Solución:**
```bash
# Cambiar puerto del frontend (.env)
REACT_APP_API_URL=http://localhost:4000/api

# O terminar los procesos que usan los puertos
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Error: "Cannot find module"
Faltan dependencias.

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### El frontend no se conecta al backend
Verificar que el backend esté corriendo y CORS esté habilitado.

**Solución:**
1. Verifica que backend esté en http://localhost:4000
2. Abre la consola del navegador (F12)
3. Revisa errores de red

---

## 📝 Variables de Entorno

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:4000/api
```

### Backend (opcional, .env)
```
PORT=4000
NODE_ENV=development
```

---

## 🎯 Próximos Pasos

1. ✅ Inicia la aplicación
2. ✅ Accede con demo@example.com / demo123
3. ✅ Explora la dashboard
4. ✅ Crea algunos eventos de prueba
5. ✅ Lee la [documentación completa](./DASHBOARD_README.md)

---

## 💡 Tips Útiles

- Los eventos de ejemplo incluyen descripciones y capacidad
- El formulario valida automáticamente
- Los eventos pasados se muestran de forma diferente
- Solo administradores pueden crear eventos

---

## 📞 Soporte

Para más información, consulta:
- Documentación del dashboard: [DASHBOARD_README.md](./DASHBOARD_README.md)
- Referencia de API: [API_REFERENCE.md](./API_REFERENCE.md)

---

**Última actualización**: Mayo 2026
