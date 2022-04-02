import React from 'react';
import Typography from '@mui/material/Typography';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import { MatchForAdmin } from '../../../../interfaces/MatchInterface';
import StatusModal from '../../../General/StatusModal';
import ReviewSchedule from '../ReviewScheduleForm/ReviewSchedule';
import GridCardBase from './GridCardBase';
import ManageTournamentService from '../ManageTournamentService';
import LoadingOverlay from '../../../General/LoadingOverlay';
import { TournamentRow, TournamentStatus } from '../ManageTournamentsEnums';

interface GridCardManageScheduleProps {
  tournament:Tournament,
  tournamentRows: TournamentRow[],
  setTournamentRows:(arg0:TournamentRow[]) => void,
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}

interface GridCardDetailsProps {
  tournament:Tournament
}
function GridCardDetails({ tournament }:GridCardDetailsProps) {
  return (
    <Typography variant="body2">
      {`Round #: ${tournament.currentRound}`}
    </Typography>
  );
}

// add back when BE fixed
//  (tournament.status === TournamentStatus.ReadyToPublishSchedule && tournament.currentRound === 0)
const canDelete = (tournament:Tournament) => tournament.status === TournamentStatus.RegistrationClosed;

function GridCardManageSchedule({
  tournament, tournamentRows, setTournamentRows, formTournament, setFormTournament,
}:GridCardManageScheduleProps) {
  const [open, setOpen] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  // TODO enable delete if its the first round only
  const [matches, setMatches] = React.useState<MatchForAdmin[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [createError, setCreateError] = React.useState(false);
  const [schedulePublished, setSchedulePublished] = React.useState(tournament.status === TournamentStatus.RegistrationClosed);
  const [scheduleCreated, setScheduleCreated] = React.useState(tournament.status === TournamentStatus.ReadyToPublishNextRound
    || tournament.status === TournamentStatus.ReadyToPublishSchedule);
  const [enableDelete] = React.useState(canDelete(tournament));
  const [errorMessage, setErrorMessage] = React.useState('');

  const tooltip1 = "A schedule has already been created. Press 'Publish Schedule' to view.";
  const tooltip2 = 'Please create a schedule first.';

  const openPublishSchedule = () => {
    setErrorModal(false);
    ManageTournamentService.getLatestRoundID(tournament.tournamentID)
      .then((roundID:number) => ManageTournamentService.getMatchesNeedingScheduling(roundID))
      .then((data:MatchForAdmin[]) => {
        setMatches(data);
        setOpen(true);
      }).catch((err:Error) => {
        setErrorMessage(err.message);
        setErrorModal(true);
      });
  };

  const createSchedule = () => {
    setCreateError(false);
    setLoading(true);
    ManageTournamentService.createSchedule(tournament.tournamentID).then(() => {
      setLoading(false);
      setOpenStatusModal(true);
      setScheduleCreated(true);
      setSchedulePublished(false);
    }).catch((err:Error) => {
      setErrorMessage(err.message);
      setLoading(false);
      setCreateError(true);
      setOpenStatusModal(true);
    });
  };

  const handleDialogClose = () => {
    setOpenStatusModal(false);
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
        enableDelete={enableDelete}
        enableEdit
        disabledButton1={scheduleCreated}
        tooltip1={tooltip1}
        disabledButton2={schedulePublished}
        tooltip2={tooltip2}
        gridCardDetails={<GridCardDetails tournament={tournament} />}
        tournamentRows={tournamentRows}
        setTournamentRows={setTournamentRows}
      />
      <ReviewSchedule
        open={open}
        setOpen={setOpen}
        matches={matches}
        setMatches={setMatches}
        tournament={tournament}
        tournamentRows={tournamentRows}
        setTournamentRows={setTournamentRows}
        setPublished={setSchedulePublished}
        enableEdit
      />
      <StatusModal
        open={errorModal}
        handleDialogClose={handleDialogClose}
        dialogText="There was an error with retrieving the schedule.Please try again later or contact support."
        dialogTitle="Error"
        isError
      />
      <StatusModal
        open={openStatusModal}
        handleDialogClose={handleDialogClose}
        dialogText={createError ? errorMessage
          : "Schedule was successfully created, click 'Publish Schedule' to view"}
        dialogTitle={createError ? 'Error' : 'Success'}
        isError={createError}
      />
      <LoadingOverlay isOpen={loading} />
    </>
  );
}

export default GridCardManageSchedule;
