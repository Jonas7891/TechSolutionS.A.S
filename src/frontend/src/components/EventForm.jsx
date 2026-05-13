import React, { useState } from 'react';
import '../styles/EventForm.css';

export function EventForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    capacity: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(formData.date);
      if (selectedDate < new Date()) {
        newErrors.date = 'La fecha no puede ser en el pasado';
      }
    }

    if (formData.capacity && isNaN(formData.capacity)) {
      newErrors.capacity = 'La capacidad debe ser un número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventData = {
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
    };

    try {
      await onSubmit(eventData);
      // Limpiar formulario
      setFormData({
        title: '',
        date: '',
        description: '',
        location: '',
        capacity: '',
      });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título del evento *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Seminario de innovación educativa"
          disabled={isLoading}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha del evento *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.date ? 'input-error' : ''}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej: Sala 201 - Edificio A"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacidad</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Ej: 50"
            disabled={isLoading}
            className={errors.capacity ? 'input-error' : ''}
            min="1"
          />
          {errors.capacity && <span className="error-message">{errors.capacity}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe brevemente el contenido del evento..."
          disabled={isLoading}
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="btn-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Creando evento...' : '➕ Crear Evento'}
      </button>
    </form>
  );
}
