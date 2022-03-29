import { DialogContent, DialogTitle, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import { Match } from '../../../../interfaces/MatchInterface';
import GeneralBigDragNDropCalendar from '../../../General/Calendar/GeneralReactBigCalendar/GeneralBigDragNDropCalendar';
import StatusModal from '../../../General/StatusModal';
import StyledButton from '../../../General/StyledButton';
import { ReactBigCalendarEvent } from '../../../../interfaces/EventInterface';
import { getFirstMatch, getLastMatch, matchToEvent } from '../../../General/Calendar/GeneralReactBigCalendar/MatchEventHelpers';

// events can't be moved to before today
interface ReviewScheduleProps {
  open:boolean,
  setOpen:(arg0:boolean) => void;
  matches:Match[],
  setMatches:(arg0:Match[]) => void,
  tournament: Tournament
}

// can drag or update via clicking

// change event colour based oon match status

function ReviewSchedule({
  open, setOpen, matches, setMatches, tournament,
}:ReviewScheduleProps) {
  const [openStatusModal, setStatusModal] = React.useState(false);
  const [lastMatch, setLastMatch] = React.useState(new Date());
  const [firstMatch, setFirstMatch] = React.useState(new Date());
  const [events, setEvents] = React.useState<ReactBigCalendarEvent[]>([]);
  const onMatchSelect = (e:Event) => {
    console.log(e);
  };
  //   const onMatchDrop = () => {
  //     // get update
  //     setMatches(matches);
  //   };
  //   const onMatchResize = () => {
  //     setMatches(matches);
  //   };
  const handleClose = () => {
    setOpen(false);
  };

  const closeStatusDialog = () => {
    setStatusModal(false);
  };

  const confirmPublish = () => {

  };

  const moveEvent = React.useCallback(
    ({
      event, start, end,
    }) => {
      const existingMatches = matches.find((match:Match) => match.matchID === event.id);
      const filteredMatches = matches.filter((match:Match) => match.matchID !== event.id);
      if (existingMatches) {
        existingMatches.startTime = start;
        existingMatches.endTime = end;
        const updated:Match[] = [...filteredMatches,
          { ...existingMatches },
        ];
        setMatches(updated);
      }

      const existingEvent = events.find((ev:ReactBigCalendarEvent) => ev.id === event.id);
      const filteredEvents = events.filter((ev:ReactBigCalendarEvent) => ev.id !== event.id);
      if (existingEvent) {
        const updatedEvent:ReactBigCalendarEvent[] = [...filteredEvents,
          {
            ...existingEvent, start, end,
          },
        ];
        setEvents(updatedEvent);
      }
    },
    [events],
  );

  const resizeEvent = React.useCallback(
    ({ event, start, end }) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev:ReactBigCalendarEvent) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev:ReactBigCalendarEvent) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [events],
  );

  React.useMemo(() => {
    if (matches.length > 0) {
      setFirstMatch(getFirstMatch(matches));
      setLastMatch(getLastMatch(matches));
      setEvents(matchToEvent(matches));
    }
  }, [matches]);

  return (
    <>
      <Dialog
        open={open}
        maxWidth="xl"
        scroll="paper"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '90vh',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5">
            {`Reviewing schedule for "${tournament.name}""`}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            {`Round duration:${firstMatch} - ${lastMatch}`}
          </Typography>
          <Typography variant="body1">
            Drag and drop to move matches around.
            Matches in red indicate that the scheduler could not find a time that satisfied both player&apos;s availabilities.
          </Typography>
          <GeneralBigDragNDropCalendar
            events={events}
            defaultDate={firstMatch}
            onMatchSelect={onMatchSelect}
            onMatchDrop={moveEvent}
            onMatchResize={resizeEvent}
            height={500}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton buttonText="Cancel" handleClick={handleClose} size="large" />
          <StyledButton buttonText="Publish" handleClick={confirmPublish} size="large" />
        </DialogActions>
      </Dialog>
      <StatusModal
        open={openStatusModal}
        handleDialogClose={closeStatusDialog}
        dialogTitle="Sucess!"
        dialogText="The schedule has been published and e-mails have been sent to the participants."
        isError={false}
      />
    </>
  );
}

export default ReviewSchedule;
