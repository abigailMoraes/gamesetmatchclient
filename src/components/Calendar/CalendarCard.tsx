import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import React, { useEffect, useState } from 'react';
// import MatchCard from './MatchHistoryCard';

function CalendarCard() {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);
  const [matches, setMatches] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);

  const handleSelectedEvent = (event:any) => {
    setSelectedEvent(event);
    setModalState(true);
  };

  const getMatches = () => {
    fetch('http://localhost:REACT_APP_API_DOMAIN')
      .then((response) => response)
      .then((response) => response.json()).then((data) => setMatches(data));
  };

  useEffect(() => {
    getMatches();
  }, []);

  const events = matches.map((match:any) => ({
    id: match.matchID,
    title: match.name,
    start: new Date(match.startTime),
    end: new Date(match.endTime),
    allDay: false,
  }));
  // eslint-disable-next-line react/no-unstable-nested-components
  function Modal() {
    return (
      <div className={`modal-${modalState ? 'show' : 'hide'}`}>
        <div className="MatchCard" />
      </div>

    );
  }
  return (
    <div className="Calendar">
      {selectedEvent && <Modal />}
      <Calendar
        step={60}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        selectable
        localizer={localizer}
        events={events}
        allDayAccessor="allDay"
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        style={{ height: 500, margin: '50px' }}
        onSelectEvent={(e) => handleSelectedEvent(e)}
      />
    </div>
  );
}

export default CalendarCard;
