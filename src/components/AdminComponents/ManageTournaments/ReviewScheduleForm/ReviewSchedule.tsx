/* eslint-disable react/require-default-props */
import {
  Backdrop, CircularProgress, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import { initMatch, Match, MatchForAdmin } from '../../../../interfaces/MatchInterface';
import { ReactBigCalendarEvent } from '../../../../interfaces/EventInterface';
import { getFirstMatch, getLastMatch, matchToEvent } from '../../../General/Calendar/GeneralReactBigCalendar/MatchEventHelpers';
import ManageTournamentService from '../ManageTournamentService';
import StyledButton from '../../../General/StyledButton';
import GeneralBigDragNDropCalendar from '../../../General/Calendar/GeneralReactBigCalendar/GeneralBigDragNDropCalendar';
import DateHelpers from '../../../General/Calendar/DateHelpers';
import MatchDetails from '../../../General/Matches/MatchDetails';
import StatusModal from '../../../General/StatusModal';
import { TournamentRow } from '../ManageTournamentsEnums';

// events can't be moved to before today
interface ReviewScheduleProps {
  open:boolean,
  setOpen:(arg0:boolean) => void;
  matches:MatchForAdmin[],
  setMatches:(arg0:MatchForAdmin[]) => void,
  tournament: Tournament,
  enableEdit:boolean,
  setPublished?:(arg0:boolean) => void,
  tournamentRows?:TournamentRow[],
  setTournamentRows?:(arg0:TournamentRow[]) => void,
}

// TODO change event colour based oon match status
function ReviewSchedule({
  open, setOpen, matches, setMatches, tournament, enableEdit = false, setPublished, tournamentRows = [], setTournamentRows,
}:ReviewScheduleProps) {
  const [openStatusModal, setStatusModal] = React.useState(false);
  const [lastMatch, setLastMatch] = React.useState(new Date());
  const [firstMatch, setFirstMatch] = React.useState(new Date());
  const [events, setEvents] = React.useState<ReactBigCalendarEvent[]>([]);
  const [selectedMatch, setSelectedMatch] = React.useState<MatchForAdmin>(initMatch);
  const [openMatchDetails, setOpenMatchDetails] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [getConfirmation, setGetConfirmation] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onEventSelect = (event:any) => {
    const match = matches.find((m) => m.matchID === event.id);
    if (match) {
      setSelectedMatch(match);
      setOpenMatchDetails(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeStatusDialog = () => {
    setStatusModal(false);
    if (!error) {
      setOpen(false);
      if (setTournamentRows && tournamentRows) {
        const updatedTournaments = tournamentRows.filter((t:TournamentRow) => t.id !== tournament.tournamentID);
        setTournamentRows(updatedTournaments);
      }
    }
  };

  const confirmPublish = () => {
    setGetConfirmation(true);
  };

  const publishMatches = () => {
    setLoading(true);
    setGetConfirmation(false);
    ManageTournamentService.saveUpdatedSchedule(tournament.tournamentID, tournament.currentRound, matches)
      // .then(() => ManageTournamentService.publishSchedule(matches))
      .then(() => {
        setLoading(false);
        setStatusModal(true);
        if (setPublished) { setPublished(true); }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        setStatusModal(true);
      });
  };

  const onConfirm = () => {
    publishMatches();
  };
  const changeEventDetails = React.useCallback(
    ({
      event, start, end,
    }) => {
      const existingMatches = matches.find((match:Match) => match.matchID === event.id);
      const filteredMatches = matches.filter((match:Match) => match.matchID !== event.id);
      if (existingMatches) {
        existingMatches.startTime = start;
        existingMatches.endTime = end;
        const updated:MatchForAdmin[] = [...filteredMatches,
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
            {`Round duration: ${DateHelpers.formatDateForDisplay(firstMatch)} - ${DateHelpers.formatDateForDisplay(lastMatch)}`}
          </Typography>
          <Typography variant="body1">
            Drag and drop to move matches around until you are satisfied with the schedule.
            {/* Matches in red indicate that the scheduler could not find a time that satisfied both player&apos;s availabilities. */}
          </Typography>
          <GeneralBigDragNDropCalendar
            events={events}
            defaultDate={firstMatch}
            onMatchSelect={onEventSelect}
            onMatchDrop={changeEventDetails}
            onMatchResize={changeEventDetails}
            height={500}
            enableEdit={enableEdit}
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
        dialogTitle={error ? 'Error' : 'Sucess!'}
        dialogText={error ? 'There was an error publishing the schedule. Please try again or contact support.'
          : 'The schedule has been published.'}
        isError={error}
      />
      <Dialog open={getConfirmation}>
        <DialogTitle>
          <Typography variant="h6">Please confirm you are ready to publish</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Once you publish a schedule you cannot make changes to it.</Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton buttonText="Cancel" handleClick={() => setGetConfirmation(false)} size="large" />
          { enableEdit && (<StyledButton buttonText="Publish" handleClick={onConfirm} size="large" />)}
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <MatchDetails isEditable={enableEdit} open={openMatchDetails} setOpen={setOpenMatchDetails} match={selectedMatch} setMatch={setSelectedMatch} />
    </>
  );
}

export default ReviewSchedule;
