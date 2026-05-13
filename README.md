# TechSolutions Academic Events Platform

Proyecto ficticio para la gestión de eventos académicos. El objetivo es practicar el flujo colaborativo de Git mediante ramas, cambios, resolución de conflictos y actualización de repositorios.

## Estructura del proyecto

- `docs/`: Documentación del proyecto.
- `src/frontend/`: Aplicación web del cliente.
- `src/backend/`: API y lógica del servidor.
- `src/backend/src/`: Código fuente del backend.
- `src/frontend/src/`: Código fuente del frontend.
- `scripts/`: Scripts de desarrollo y despliegue.

## Flujo recomendado de Git

1. Crear una rama para cada tarea: `feature/nombre-tarea`.
2. Trabajar localmente y registrar cambios con `git add` + `git commit`.
3. Subir la rama a GitHub: `git push origin feature/nombre-tarea`.
4. Resolver conflictos en `git pull` o durante el merge.
5. Mantener la rama `main` actualizada con `git pull origin main`.
