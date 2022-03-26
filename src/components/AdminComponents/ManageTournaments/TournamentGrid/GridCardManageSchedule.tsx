import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import { Match } from '../../../../interfaces/MatchInterface';
import StatusModal from '../../../General/StatusModal';
import ReviewSchedule from '../ReviewScheduleForm/ReviewSchedule';
import GridCardBase from './GridCardBase';
import ManageTournamentService from '../ManageTournamentService';

interface GridCardManageScheduleProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}

function GridCardManageSchedule({ tournament, formTournament, setFormTournament }:GridCardManageScheduleProps) {
  const [open, setOpen] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  // TODO enable delete if its the first round only
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [createError, setCreateError] = React.useState(false);
  const openPublishSchedule = () => {
    ManageTournamentService.getMatchesNeedingScheduling(tournament.currentRound).then((data) => {
      setMatches(data);
      setOpen(true);
    }).catch(() => {
      setErrorModal(true);
    });
  };

  const createSchedule = () => {
    setLoading(true);
    ManageTournamentService.createSchedule(tournament.tournamentID).then(() => {
      setLoading(false);
      setOpenStatus(true);
    }).catch(() => {
      setLoading(false);
      setCreateError(true);
      setOpenStatus(true);
    });
  };

  const handleDialogClose = () => {
    setOpenStatus(false);

    setErrorModal(false);
    setCreateError(false);
  };

  return (
    <>
      <GridCardBase
        tournament={tournament}
        formTournament={formTournament}
        setFormTournament={setFormTournament}
        buttonName="Create Schedule"
        onButtonClick={createSchedule}
        buttonName2="Publish Schedule"
        onButtonClick2={openPublishSchedule}
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
      <StatusModal
        open={openStatus}
        handleDialogClose={handleDialogClose}
        dialogText={createError ? 'There was an error with creating the schedule.Please try again later or contact support.'
          : "Schedule was sucessfully created, click 'Publish Schedule' to view"}
        dialogTitle={createError ? 'Error' : 'Success'}
        isError={createError}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default GridCardManageSchedule;
