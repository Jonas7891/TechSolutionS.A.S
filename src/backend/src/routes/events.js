const express = require('express');
const router = express.Router();

const sampleEvents = [
  { id: 1, title: 'Seminario de innovación educativa', date: '2026-06-15' },
  { id: 2, title: 'Taller de desarrollo de proyectos', date: '2026-07-05' }
];

router.get('/', (req, res) => {
  res.json(sampleEvents);
});

router.post('/', (req, res) => {
  const newEvent = { id: sampleEvents.length + 1, ...req.body };
  sampleEvents.push(newEvent);
  res.status(201).json(newEvent);
});

module.exports = router;
