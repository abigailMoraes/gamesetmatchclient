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

const canDelete = (tournament:Tournament) => (tournament.status === TournamentStatus.ReadyToPublishSchedule && tournament.currentRound === 0)
|| tournament.status === TournamentStatus.RegistrationClosed;

function GridCardManageSchedule({
  tournament, tournamentRows, setTournamentRows, formTournament, setFormTournament,
}:GridCardManageScheduleProps) {
  const [open, setOpen] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  // TODO enable delete if its the first round only
  const [matches, setMatches] = React.useState<MatchForAdmin[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [createError, setCreateError] = React.useState(false);
  const [schedulePublished, setSchedulePublished] = React.useState(tournament.status === TournamentStatus.RegistrationClosed);
  const [scheduleCreated, setScheduleCreated] = React.useState(tournament.status === TournamentStatus.ReadyToPublishNextRound
    || tournament.status === TournamentStatus.ReadyToPublishSchedule);
  const [enableDelete] = React.useState(canDelete(tournament));

  const tooltip1 = "A schedule has already been created. Press 'Publish Schedule' to view.";
  const tooltip2 = 'Please create a schedule first.';

  const openPublishSchedule = () => {
    ManageTournamentService.getLatestRoundID(tournament.tournamentID)
      .then((roundID:number) => ManageTournamentService.getMatchesNeedingScheduling(roundID))
      .then((data:MatchForAdmin[]) => {
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
      setScheduleCreated(true);
      setSchedulePublished(false);
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
        enableDelete={enableDelete}
        enableEdit
        disabeledButton1={scheduleCreated}
        tooltip1={tooltip1}
        disabeledButton2={schedulePublished}
        tooltip2={tooltip2}
        gridCardDetails={<GridCardDetails tournament={tournament} />}
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
        open={openStatus}
        handleDialogClose={handleDialogClose}
        dialogText={createError ? 'There was an error with creating the schedule.Please try again later or contact support.'
          : "Schedule was sucessfully created, click 'Publish Schedule' to view"}
        dialogTitle={createError ? 'Error' : 'Success'}
        isError={createError}
      />
      <LoadingOverlay isOpen={loading} />
    </>
  );
}

export default GridCardManageSchedule;
