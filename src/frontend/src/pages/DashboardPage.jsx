import React, { useState, useEffect } from 'react';
import { EventCard, EventForm, StatCard } from '../components';
import { getEvents, createEvent } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import '../styles/Dashboard.css';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError('No se pudieron cargar los eventos. Intenta más tarde.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      setFormLoading(true);
      const newEvent = await createEvent(eventData);
      setEvents((prev) => [...prev, newEvent]);
      setSuccessMessage('¡Evento creado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error al crear el evento: ' + err.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setFormLoading(false);
    }
  };

  // Calcular estadísticas
  const totalEvents = events.length;
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) > new Date()
  ).length;
  const pastEvents = events.filter(
    (e) => new Date(e.date) <= new Date()
  ).length;

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🎓 TechSolutions</h1>
            <p>Gestión de Eventos Académicos</p>
          </div>
          <div className="header-user-info">
            <div className="user-badge">
              <span className="user-icon">👤</span>
              <div className="user-details">
                <p className="user-name">{user?.name}</p>
                <p className="user-role">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
              </div>
            </div>
            <button className="logout-button" onClick={logout}>
              🚪 Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {successMessage && (
        <div className="alert alert-success">
          ✅ {successMessage}
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          ❌ {error}
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Navigation Tabs */}
        <nav className="dashboard-nav">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Resumen
          </button>
          <button
            className={`nav-tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 Eventos
          </button>
          {user?.role === 'admin' && (
            <button
              className={`nav-tab ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              ➕ Crear Evento
            </button>
          )}
        </nav>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="dashboard-section">
            <h2>📊 Resumen de Eventos</h2>
            
            {loading ? (
              <div className="loading-state">
                <p>Cargando eventos...</p>
              </div>
            ) : (
              <>
                <div className="stats-grid">
                  <StatCard
                    icon="📅"
                    label="Eventos Totales"
                    value={totalEvents}
                    color="blue"
                  />
                  <StatCard
                    icon="⏳"
                    label="Próximos Eventos"
                    value={upcomingEvents}
                    color="green"
                  />
                  <StatCard
                    icon="✓"
                    label="Eventos Realizados"
                    value={pastEvents}
                    color="purple"
                  />
                  <StatCard
                    icon="👤"
                    label="Tu Rol"
                    value={user?.role === 'admin' ? 'Administrador' : 'Usuario'}
                    color="orange"
                  />
                </div>

                {events.length > 0 && (
                  <div className="upcoming-events-preview">
                    <h3>Próximos eventos</h3>
                    <div className="events-preview-list">
                      {events
                        .filter((e) => new Date(e.date) > new Date())
                        .slice(0, 3)
                        .map((event) => (
                          <div key={event.id} className="event-preview-item">
                            <div>
                              <h4>{event.title}</h4>
                              <p>📅 {new Date(event.date).toLocaleDateString('es-ES')}</p>
                            </div>
                            <span className="preview-badge">Próximo</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <section className="dashboard-section">
            <h2>📅 Todos los Eventos</h2>
            
            {loading ? (
              <div className="loading-state">
                <p>Cargando eventos...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="empty-state">
                <p>📭 No hay eventos registrados aún</p>
                <p className="empty-hint">
                  {user?.role === 'admin' 
                    ? 'Crea el primer evento desde la sección "Crear Evento"' 
                    : 'Los eventos aparecerán aquí cuando se creen'}
                </p>
              </div>
            ) : (
              <div className="events-grid">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Create Event Tab */}
        {activeTab === 'create' && user?.role === 'admin' && (
          <section className="dashboard-section">
            <h2>➕ Crear Nuevo Evento</h2>
            <div className="form-container">
              <EventForm 
                onSubmit={handleCreateEvent}
                isLoading={formLoading}
              />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2026 TechSolutions S.A.S - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
