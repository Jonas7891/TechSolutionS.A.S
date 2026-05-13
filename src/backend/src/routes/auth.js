const express = require('express');
const router = express.Router();
const { validateLoginCredentials, validateRegisterCredentials } = require('../utils/validators');

/**
 * Datos simulados de usuarios registrados
 * En producción, esto sería una base de datos
 */
const registeredUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'demo',
    role: 'admin'
  }
];

/**
 * POST /api/auth/login
 * Valida credenciales y retorna usuario con token
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validar credenciales
  const validationError = validateLoginCredentials(email, password);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Buscar usuario
  const user = registeredUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' });
  }

  // Generar respuesta (sin enviar la contraseña)
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    token: `token_${Date.now()}`
  };

  res.json({ success: true, user: userData });
});

/**
 * POST /api/auth/register
 * Registra un nuevo usuario con validaciones
 */
router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Validar datos
  const validationError = validateRegisterCredentials(email, password, confirmPassword);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Verificar si el usuario ya existe
  if (registeredUsers.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Este email ya está registrado' });
  }

  // Crear nuevo usuario
  const newUser = {
    id: Date.now().toString(),
    email,
    password, // En producción, esto debe estar hasheado
    name: email.split('@')[0],
    role: 'user'
  };

  registeredUsers.push(newUser);

  // Retornar usuario (sin enviar la contraseña)
  const userData = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    token: `token_${Date.now()}`
  };

  res.status(201).json({ success: true, user: userData });
});

module.exports = router;
