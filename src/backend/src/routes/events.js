const express = require('express');
const router = express.Router();

let sampleEvents = [
  { 
    id: 1, 
    title: 'Seminario de innovación educativa', 
    date: '2026-06-15',
    description: 'Explora las últimas tendencias en innovación educativa y su aplicación en el aula moderna.',
    location: 'Sala 201 - Edificio A',
    capacity: 50
  },
  { 
    id: 2, 
    title: 'Taller de desarrollo de proyectos', 
    date: '2026-07-05',
    description: 'Aprende a desarrollar y gestionar proyectos educativos efectivos.',
    location: 'Laboratorio de Sistemas',
    capacity: 30
  },
  {
    id: 3,
    title: 'Conferencia: Transformación Digital en Educación',
    date: '2026-05-20',
    description: 'Cómo la tecnología está transformando el panorama educativo.',
    location: 'Auditorio Principal',
    capacity: 100
  }
];

/**
 * GET /api/events
 * Obtiene la lista de todos los eventos
 * Query params opcionales:
 *  - upcoming: boolean (retorna solo eventos futuros)
 *  - past: boolean (retorna solo eventos pasados)
 */
router.get('/', (req, res) => {
  let events = [...sampleEvents];

  if (req.query.upcoming === 'true') {
    const now = new Date();
    events = events.filter(e => new Date(e.date) > now);
  } else if (req.query.past === 'true') {
    const now = new Date();
    events = events.filter(e => new Date(e.date) <= now);
  }

  res.json(events);
});

/**
 * GET /api/events/:id
 * Obtiene un evento específico por ID
 */
router.get('/:id', (req, res) => {
  const event = sampleEvents.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }

  res.json(event);
});

/**
 * POST /api/events
 * Crea un nuevo evento
 * Body required: { title, date, description?, location?, capacity? }
 */
router.post('/', (req, res) => {
  const { title, date, description, location, capacity } = req.body;

  // Validaciones
  if (!title || !date) {
    return res.status(400).json({ 
      error: 'El título y la fecha son campos requeridos' 
    });
  }

  if (new Date(date) < new Date()) {
    return res.status(400).json({ 
      error: 'La fecha del evento no puede ser en el pasado' 
    });
  }

  const newEvent = {
    id: Math.max(...sampleEvents.map(e => e.id), 0) + 1,
    title,
    date,
    description: description || '',
    location: location || '',
    capacity: capacity ? parseInt(capacity) : null,
  };

  sampleEvents.push(newEvent);
  res.status(201).json(newEvent);
});

/**
 * PUT /api/events/:id
 * Actualiza un evento existente
 */
router.put('/:id', (req, res) => {
  const event = sampleEvents.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }

  const { title, date, description, location, capacity } = req.body;

  if (title) event.title = title;
  if (date) {
    if (new Date(date) < new Date()) {
      return res.status(400).json({ 
        error: 'La fecha del evento no puede ser en el pasado' 
      });
    }
    event.date = date;
  }
  if (description) event.description = description;
  if (location) event.location = location;
  if (capacity) event.capacity = parseInt(capacity);

  res.json(event);
});

/**
 * DELETE /api/events/:id
 * Elimina un evento
 */
router.delete('/:id', (req, res) => {
  const index = sampleEvents.findIndex(e => e.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }

  const deletedEvent = sampleEvents.splice(index, 1);
  res.json({ message: 'Evento eliminado correctamente', event: deletedEvent[0] });
});

/**
 * GET /api/events/stats/summary
 * Retorna estadísticas sobre los eventos
 */
router.get('/stats/summary', (req, res) => {
  const now = new Date();
  const upcoming = sampleEvents.filter(e => new Date(e.date) > now).length;
  const past = sampleEvents.filter(e => new Date(e.date) <= now).length;
  const totalCapacity = sampleEvents.reduce((sum, e) => sum + (e.capacity || 0), 0);

  res.json({
    total: sampleEvents.length,
    upcoming,
    past,
    totalCapacity,
    averageCapacity: sampleEvents.length > 0 ? Math.round(totalCapacity / sampleEvents.length) : 0
  });
});

module.exports = router;
