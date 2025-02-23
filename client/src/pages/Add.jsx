import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const Add = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [visitType, setVisitType] = useState('Tatuaż');
  const [visitNote, setvisitNote] = useState('');

  useEffect(() => {
    document.title = 'Zapisz się | FBTS';
    axios.get('http://localhost:8800/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDateSelect = (selectInfo) => {
    if (window.confirm('Czy na pewno chcesz zapisać wizytę?') && name && surname) {
      const newEvent = {
        title: `${visitType} - ${name} ${surname}`,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        name,
        surname,
        visit_type: visitType,
        note: visitNote
      };
      axios.post('http://localhost:8800/events', newEvent)
        .then(response => setEvents([...events, response.data]))
        .catch(error => console.error(error));
      window.location.reload();
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

  const handleEventChange = (changeInfo) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      end: changeInfo.event.endStr,
      note: changeInfo.event.visitNote,
      visit_type: changeInfo.event.visitType
    };
    axios.put(`http://localhost:8800/events/${changeInfo.event.id}`, updatedEvent)
      .then(() => setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event)))
      .catch(error => console.error(error));
    window.location.reload();
  };

  return (
    <div className="container-fluid py-5">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="mb-4">Zapisz się na wizytę!</h2>
          <form className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
              <label className="form-label">Imię</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Nazwisko</label>
              <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Temat wizyty</label>
              <select className="form-select" value={visitType} onChange={(e) => setVisitType(e.target.value)}>
                <option value="Tatuaż">Tatuaż</option>
                <option value="Usunięcie tatuażu">Usunięcie tatuażu</option>
                <option value="Konsultacja">Konsultacja</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Notatka</label>
              <textarea className="form-control" value={visitNote} onChange={(e) => setvisitNote(e.target.value)}></textarea>
            </div>
          </form>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'title',
                center: 'dayGridMonth,timeGridWeek',
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
              select={handleDateSelect}
              events={events.map(event => ({
                ...event,
                color: event.visit_type === 'Tatuaż' ? 'blue' : event.visit_type === 'Konsultacja' ? 'green' : 'red'
              }))}
              eventClick={handleEventClick}
              eventDrop={handleEventChange}
              editable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
