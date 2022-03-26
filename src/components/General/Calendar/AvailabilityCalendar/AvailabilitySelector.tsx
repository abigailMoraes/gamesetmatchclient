import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar, Views } from 'react-big-calendar';
import { useAtomValue } from 'jotai';
import { ReactBigCalendarEvent } from '../../../../interfaces/EventInterface';
import { localizerAtom } from '../../../../atoms/localizerAtom';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const DragAndDropCalendar = withDragAndDrop(Calendar as any);

interface AvailabilitySelectorProps {
  availabilities: ReactBigCalendarEvent[],
  setAvailabilities:(arg0:ReactBigCalendarEvent[]) => void,
}

export type Availability = {
  day:number;
  slots:string
};

function AvailabilitySelector({ availabilities, setAvailabilities }:AvailabilitySelectorProps) {
  const localizer = useAtomValue(localizerAtom);

  const handleSelectSlot = React.useCallback(
    ({ start, end }) => {
      // round up the time slots
      const eventID = availabilities.length;
      const availability: ReactBigCalendarEvent = {
        title: 'Available',
        start,
        end,
        allDay: false,
        id: eventID + 1,
      };
      const updatedAvailabilites = [...availabilities, availability];
      setAvailabilities(updatedAvailabilites);
      // update availabilities
    },
    [availabilities],
  );

  const handleSelectEvent = React.useCallback(
    (event:any) => {
      const existingAvail = availabilities.find((ev:ReactBigCalendarEvent) => ev.id === event.id);
      if (existingAvail) {
        const filteredAvailabilities = availabilities.filter((ev:ReactBigCalendarEvent) => ev.id !== event.id);
        setAvailabilities(filteredAvailabilities);
      }
    },
    [availabilities],
  );

  const changeEventDetails = React.useCallback(
    ({
      event, start, end,
    }) => {
      const existingAvail = availabilities.find((ev:ReactBigCalendarEvent) => ev.id === event.id);
      const filteredAvailabilities = availabilities.filter((ev:ReactBigCalendarEvent) => ev.id !== event.id);
      if (existingAvail) {
        const updatedAvails:ReactBigCalendarEvent[] = [...filteredAvailabilities,
          {
            ...existingAvail, start, end,
          },
        ];
        setAvailabilities(updatedAvails);
      }
    },
    [availabilities],
  );

  const { defaultDate, formats } = React.useMemo(
    () => ({
      defaultDate: new Date(),
      formats: {
        dayFormat: (date:any) => date.toLocaleString('default', { weekday: 'long' }),
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: '10px' }}>
      <Typography variant="h6">
        Provide your general availability for a week.
      </Typography>
      <Typography variant="body1">
        To delete, click on the availability you provided.
      </Typography>
      <Typography>
        This will be used to help schedule your matches, but there is no guarantee we will schedule only in your provided availability.
      </Typography>
      <div style={{ height: 600 }}>
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={availabilities}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onEventDrop={changeEventDetails}
          onEventResize={changeEventDetails}
          selectable
          toolbar={false}
          formats={formats}
          min={new Date(0, 0, 0, 9, 0, 0)}
          max={new Date(0, 0, 0, 22, 0, 0)}
        />
      </div>
    </Paper>
  );
}

export default AvailabilitySelector;
