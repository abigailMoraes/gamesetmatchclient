import React from 'react';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import { Match } from '../../../../interfaces/MatchInterface';
import MatchService from '../../../Calendar/MatchService';
import StatusModal from '../../../General/StatusModal';
import ReviewSchedule from '../ReviewScheduleForm/ReviewSchedule';
import GridCardBase from './GridCardBase';

interface GridCardManageScheduleProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}

const mockMatches:Match[] = [{
  results: 'win',
  attendance: 'No',
  matchID: 1,
  startTime: new Date('2022-02-20 11:00:00'),
  endTime: new Date('2022-02-20 11:30:00'),
  duration: 30,
  type: 'Preliminary',
  name: 'Mariokart Madness',
  location: 'West Atrium room 203',
  description: 'Come join us for some krazy karting! (Individual)',
}, {
  results: 'loss',
  attendance: 'No',
  matchID: 4,
  startTime: new Date('2022-03-05 12:00:00'),
  endTime: new Date('2022-03-05 12:30:00'),
  duration: 30,
  type: 'Preliminary',
  name: 'Mariokart Madness',
  location: 'West Atrium room 203',
  description: 'Come join us for some krazy karting! (Individual)',
}, {
  results: 'TBD',
  attendance: 'Yes',
  matchID: 6,
  startTime: new Date('2022-03-05 13:30:00'),
  endTime: new Date('2022-03-05 14:00:00'),
  duration: 30,
  type: 'Preliminary',
  name: 'Mariokart Madness',
  location: 'West Atrium room 203',
  description: 'Come join us for some krazy karting! (Individual)',
}];

function GridCardManageSchedule({ tournament, formTournament, setFormTournament }:GridCardManageScheduleProps) {
  const [open, setOpen] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  // TODO enable delete if its the first round only
  const [matches, setMatches] = React.useState<Match[]>([]);

  const openPublishSchedule = () => {
    setMatches(mockMatches);
    setOpen(true);
    MatchService.getAll(tournament.tournamentID).then((data) => {
      setMatches(data);
      setOpen(true);
    }).catch(() => {
      // setErrorModal(true);
      setMatches(mockMatches);
      setOpen(true);
    });
  };

  const handleDialogClose = () => {
    setErrorModal(false);
  };

  return (
    <>
      <GridCardBase
        tournament={tournament}
        formTournament={formTournament}
        setFormTournament={setFormTournament}
        buttonName="Publish Schedule"
        onButtonClick={openPublishSchedule}
        enableDelete={false}
        enableEdit
      />
      <ReviewSchedule
        open={open}
        setOpen={setOpen}
        matches={matches}
        setMatches={setMatches}
        tournament={tournament}
      />
      <StatusModal
        open={errorModal}
        handleDialogClose={handleDialogClose}
        dialogText="There was an error with retrieving the schedule.Please try again later or contact support."
        dialogTitle="Error"
        isError
      />
    </>
  );
}

export default GridCardManageSchedule;
