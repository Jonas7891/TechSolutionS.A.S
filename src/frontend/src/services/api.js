/**
 * Servicio API para comunicarse con el backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Realiza peticiones GET
 */
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};

/**
 * Realiza peticiones POST
 */
export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de eventos
 */
export const getEvents = async () => {
  return apiGet('/events');
};

/**
 * Crea un nuevo evento
 */
export const createEvent = async (eventData) => {
  return apiPost('/events', eventData);
};

/**
 * Verifica el estado del backend
 */
export const healthCheck = async () => {
  return apiGet('/health');
};
