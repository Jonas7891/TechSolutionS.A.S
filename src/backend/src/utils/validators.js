/**
 * Validadores para autenticación
 */

function validateEmail(email) {
  if (!email) {
    return 'El email es requerido';
  }
  if (!email.includes('@')) {
    return 'Por favor ingrese un email válido';
  }
  return null;
}

function validatePassword(password) {
  if (!password) {
    return 'La contraseña es requerida';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return null;
}

function validateLoginCredentials(email, password) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
}

function validateRegisterCredentials(email, password, confirmPassword) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  if (!confirmPassword) {
    return 'La confirmación de contraseña es requerida';
  }

  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }

  return null;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateLoginCredentials,
  validateRegisterCredentials
};
