#!/bin/bash

echo "======================================"
echo "  TechSolutions - Gestor de Eventos"
echo "======================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js detectado"

# Ir a la carpeta del backend
echo ""
echo "📦 Iniciando el backend..."
cd src/backend

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del backend..."
    npm install
fi

# Iniciar el backend en background
npm start &
BACKEND_PID=$!

# Esperar a que el backend inicie
sleep 3

# Ir a la carpeta del frontend
echo ""
echo "📦 Iniciando el frontend..."
cd ../frontend

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
fi

# Iniciar el frontend
npm start

# Limpiar
trap "kill $BACKEND_PID" EXIT
