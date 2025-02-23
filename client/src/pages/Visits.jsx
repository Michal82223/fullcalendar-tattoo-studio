import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const Visits = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    document.title = 'Wizyty | FBTS';
    axios.get('http://localhost:8800/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEditClick = (event) => {
    setEditEvent(event);
  };

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8800/events/${editEvent.id}`, editEvent)
      .then(() => {
        setEvents(events.map(event => event.id === editEvent.id ? editEvent : event));
        setEditEvent(null);
        window.location.reload()
      })
      .catch(error => console.error(error));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/events/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Czy chcesz usunąć wizytę '${clickInfo.event.title}'?`)) {
      axios.delete(`http://localhost:8800/events/${clickInfo.event.id}`)
        .then(() => setEvents(events.filter(event => event.id !== clickInfo.event.id)))
        .catch(error => console.error(error));
      window.location.reload();
    }
  };
  
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Wizyty</h2>

      <div className="d-flex justify-content-center my-4">
        <div className="col-12 col-md-6 col-lg-6 bg-white p-4 rounded shadow">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'title',
              center: 'dayGridMonth,timeGridWeek,timeGridDay',
              right: 'today,prev,next'
            }}
            buttonText={{
              today: 'Dziś',
              month: 'Miesiąc',
              week: 'Tydzień',
              day: 'Dzień',
              list: 'Lista',
              timeGrid: 'Plan dnia'
            }}
            aspectRatio={1.5}
            firstDay={1}
            locale={'pl'}
            selectable={true}
            events={events.map(event => ({
              ...event,
              color: event.visit_type === 'Tatuaż' ? 'blue' : event.visit_type === 'Konsultacja' ? 'green' : 'red'
            }))}
            eventClick={handleEventClick}
            editable={true}
          />
        </div>
      </div>

      <div className="row g-3">

        {events.map(event => (

          <div className="col-12 col-md-6 col-lg-4" key={event.id} onClick={() => toggleExpand(event.id)} style={{ cursor: 'pointer' }}>
            <div className="card shadow-sm p-3 border-0">
            <div className="card-body">
              <h5 className="card-title">{event.name} {event.surname}</h5>
              <p className="card-text"><strong>{event.visit_type}</strong></p>

                {expandedId === event.id && (
                  <div className="mt-3">
                    <p><strong>Początek:</strong> {event.start}</p>
                    <p><strong>Koniec:</strong> {event.end}</p>
                    <p><strong>Notatka:</strong> {event.note}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-danger btn-sm flex-grow-1" onClick={(e) => { e.stopPropagation(); handleDelete(event.id); }}>Odwołaj</button>
                      <button className="btn btn-primary btn-sm flex-grow-1" onClick={(e) => { e.stopPropagation(); handleEditClick(event); }}>Edytuj</button>
                    </div>
                  </div>
                )}
              </div>
              </div>
          </div>
        ))}
      </div>

      {editEvent && (
        <div className="d-flex flex-column align-items-center mt-3">
          <div className="col-12 col-md-6 col-lg-4">
          <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleEditSubmit}>
            <h3 className="mb-4">Edycja wizyty</h3>
            <div className="mb-3">
              <label className="form-label">Imię</label>
              <input type="text" className="form-control" name="name" value={editEvent.name} onChange={handleEditChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Nazwisko</label>
              <input type="text" className="form-control" name="surname" value={editEvent.surname} onChange={handleEditChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Temat wizyty</label>
              <select className="form-control" name="visit_type" value={editEvent.visit_type} onChange={handleEditChange}>
                <option value="Tatuaż">Tatuaż</option>
                <option value="Usunięcie tatuażu">Usunięcie tatuażu</option>
                <option value="Konsultacja">Konsultacja</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Notatka</label>
              <textarea className="form-control" name="note" value={editEvent.note} onChange={handleEditChange}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Początek wizyty</label>
              <input className="form-control" type="datetime-local" name="start" value={editEvent.start} onChange={handleEditChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Koniec wizyty</label>
              <input className="form-control" type="datetime-local" name="end" value={editEvent.end} onChange={handleEditChange} />
            </div>

            <button className="btn btn-primary w-100" type="submit">Zaktualizuj</button>
          </form>
          </div>
        </div>
        )}
    </div>
  );
};

export default Visits;