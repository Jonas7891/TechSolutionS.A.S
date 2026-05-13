import React from 'react';
import '../styles/EventCard.css';

export function EventCard({ event, onDelete }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isPast = eventDate < new Date();

  return (
    <div className={`event-card ${isPast ? 'past-event' : 'upcoming-event'}`}>
      <div className="event-card-header">
        <h3>{event.title}</h3>
        {isPast && <span className="event-badge">Pasado</span>}
      </div>
      
      <div className="event-card-body">
        <div className="event-date">
          <span className="date-icon">📅</span>
          <span>{formattedDate}</span>
        </div>
        
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        
        {event.location && (
          <div className="event-location">
            <span className="location-icon">📍</span>
            <span>{event.location}</span>
          </div>
        )}

        {event.capacity && (
          <div className="event-capacity">
            <span className="capacity-icon">👥</span>
            <span>{event.capacity} participantes</span>
          </div>
        )}
      </div>

      <div className="event-card-footer">
        <button className="btn-details">Ver detalles</button>
        {onDelete && (
          <button 
            className="btn-delete" 
            onClick={() => onDelete(event.id)}
            title="Eliminar evento"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
