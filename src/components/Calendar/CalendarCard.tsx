import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userIDAtom } from '../../atoms/userAtom';
import MatchService from './MatchService';
import MatchHistoryDialogue from './MatchHistoryDialogue';
import { User } from './MatchHistoryCard';
import UserService from './UserService';
import { Match } from './MatchInterface';

function CalendarCard() {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);
  const [matches, setMatches] = useState([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match>(matches[0]);
  const userID = useAtomValue(userIDAtom);
  useEffect(() => {
    MatchService.getAll(userID)
      .then((data) => {
        setLoading(false);
        setMatches(data);
      });
  }, [loading]);
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
          <MatchHistoryDialogue match={selectedMatch} participants={participants} />
        </div>
      </div>

    );
  }
  return (
    <div>
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
        style={{ height: 500, margin: '50px' }}
        onSelectEvent={(e) => { handleSelectedEvent(e); }}
        popup
      />
      {selectedEvent && <Modal />}
    </div>
  );
}

export default CalendarCard;
