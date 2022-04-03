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
const canDelete = (tournament:Tournament) => tournament.status === TournamentStatus.ReadyToSchedule && tournament.currentRound === 0;

function GridCardManageSchedule({
  tournament, tournamentRows, setTournamentRows, formTournament, setFormTournament,
}:GridCardManageScheduleProps) {
  const [open, setOpen] = React.useState(false);
  const [roundID, setRoundID] = React.useState(0);

  const [matches, setMatches] = React.useState<MatchForAdmin[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [statusModalText, setStatusModalText] = React.useState('');

  const [schedulePublished, setSchedulePublished] = React.useState(tournament.status === TournamentStatus.ReadyToSchedule);
  const [scheduleCreated, setScheduleCreated] = React.useState(tournament.status === TournamentStatus.ReadyToPublishNextRound
    || tournament.status === TournamentStatus.ReadyToPublishSchedule);
  const [enableDelete] = React.useState(canDelete(tournament));

  const tooltip1 = "A schedule has already been created. Press 'Publish Schedule' to view.";
  const tooltip2 = 'Please create a schedule first.';

  const openPublishSchedule = () => {
    setError(false);
    ManageTournamentService.getLatestRoundID(tournament.tournamentID)
      .then((latestRoundID:number) => {
        if (latestRoundID) {
          setRoundID(latestRoundID);
          return ManageTournamentService.getMatchesNeedingScheduling(latestRoundID);
        }
        throw new Error('No schedule found. Round number is invalid.');
      })
      .then((data:MatchForAdmin[]) => {
        setMatches(data);
        setOpen(true);
      }).catch((err:Error) => {
        setStatusModalText(err.message);
        setError(true);
        setOpenStatusModal(true);
      });
  };

  const createSchedule = () => {
    setError(false);
    setLoading(true);
    ManageTournamentService.createSchedule(tournament.tournamentID).then(() => {
      setLoading(false);
      setStatusModalText("Schedule was successfully created, click 'Publish Schedule' to view.");
      setOpenStatusModal(true);
      setScheduleCreated(true);
      setSchedulePublished(false);
    }).catch((err:Error) => {
      setStatusModalText(err.message);
      setLoading(false);
      setError(true);
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
        roundID={roundID}
      />
      <StatusModal
        open={openStatusModal}
        handleDialogClose={handleDialogClose}
        dialogText={statusModalText}
        dialogTitle={error ? 'Error' : 'Success'}
        isError={error}
      />
      <LoadingOverlay isOpen={loading} />
    </>
  );
}

export default GridCardManageSchedule;
