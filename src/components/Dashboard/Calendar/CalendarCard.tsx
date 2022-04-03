import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import React, { useState } from 'react';

import { Paper } from '@mui/material';
import { User } from '../OverviewGrid/MatchHistoryCard';
import UserService from './UserService';
import { Match } from '../../../interfaces/MatchInterface';
import MatchHistoryDialogue from './MatchHistoryDialogue';

interface CalendarCardProps {
  matches:Match[],
  setMatches:(argo0:Match[]) => void,
}

function CalendarCard({ matches, setMatches }:CalendarCardProps) {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);
  const [participants, setParticipants] = useState<User[]>([]);
  const [modalState, setModalState] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match>(matches[0]);
  const events:Event[] = matches.map((item:any) => ({
    title: item.name,
    start: new Date(item.startTime),
    end: new Date(item.endTime),
    allDay: false,
    resource: item.id,
  }));
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const handleSelectedEvent = (event: Event) => {
    setSelectedEvent(event);
    setSelectedMatch(matches[events.indexOf(event)]);
    UserService.getMatchParticipants(event.resource).then((data) => setParticipants(data));
    setModalState(true);
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function Modal() {
    return (
      <div className={`modal-${modalState ? 'show' : 'hide'}`}>
        <div className="modal-content">
          <MatchHistoryDialogue match={selectedMatch} participants={participants} matches={matches} setMatches={setMatches} />
        </div>
      </div>

    );
  }
  return (
    <Paper sx={{ p: 2, minHeight: '90vh' }}>
      <Calendar
        selected={selectedEvent}
        step={60}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        selectable
        localizer={localizer}
        events={events}
        allDayAccessor="allDay"
        startAccessor="start"
        endAccessor="end"
        resourceAccessor="resource"
        views={['month', 'week', 'day', 'agenda']}
        style={{ height: '85vh', width: '50vw' }}
        onSelectEvent={(e) => { handleSelectedEvent(e); }}
        popup
      />
      {selectedEvent && <Modal />}
    </Paper>
  );
}

export default CalendarCard;
