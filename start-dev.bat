@echo off

echo ======================================
echo   TechSolutions - Gestor de Eventos
echo ======================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js no esta instalado
    echo Por favor descargalo desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo.

REM Iniciar el backend
echo Iniciando el backend...
cd src\backend

if not exist node_modules (
    echo Instalando dependencias del backend...
    call npm install
)

start cmd /k "npm start"

REM Esperar un poco para que el backend inicie
timeout /t 3 /nobreak

REM Iniciar el frontend
echo.
echo Iniciando el frontend...
cd ..\frontend

if not exist node_modules (
    echo Instalando dependencias del frontend...
    call npm install
)

start cmd /k "npm start"

echo.
echo ============================================
echo Backend iniciado en: http://localhost:4000
echo Frontend iniciado en: http://localhost:3000
echo ============================================
echo.
echo Credenciales de prueba:
echo   Email: demo@example.com
echo   Password: demo123
echo.
pause
