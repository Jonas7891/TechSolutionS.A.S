const express = require('express');
const eventsRouter = require('./routes/events');

const app = express();
app.use(express.json());

app.use('/api/events', eventsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TechSolutions Eventos Académicos' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
