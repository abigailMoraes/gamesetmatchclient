import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';
import React from 'react';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { ReactBigCalendarEvent } from '../../../../interfaces/EventInterface';

const DragAndDropCalendar = withDragAndDrop(Calendar as any);

interface GeneralBigCalendarProps {
  events:ReactBigCalendarEvent[],
  defaultDate?:Date,
  defaultView?:View | undefined,
  onMatchSelect:(e:any) => void;
  onMatchDrop:(argo0:any) => void;
  onMatchResize?:(arg0:any) => void;
  height?:number;
}

function GeneralBigDragNDropCalendar({
  events, defaultDate, defaultView, onMatchSelect, onMatchDrop, onMatchResize, height,
}:GeneralBigCalendarProps) {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);

  return (
    <div style={{ height: `${height}px`, margin: '50px' }}>
      <DragAndDropCalendar
        defaultDate={defaultDate}
        localizer={localizer}
        defaultView={defaultView}
        events={events}
        onEventDrop={onMatchDrop}
        onEventResize={onMatchResize}
        timeslots={2}
        onSelectEvent={(e) => onMatchSelect(e)}
      />
    </div>
  );
}

GeneralBigDragNDropCalendar.defaultProps = {
  defaultDate: new Date(),
  defaultView: 'month',
  onMatchResize: undefined,
  height: 500,
};

export default GeneralBigDragNDropCalendar;
