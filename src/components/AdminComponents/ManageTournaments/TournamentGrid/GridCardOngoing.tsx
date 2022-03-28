import React from 'react';
import { MatchForAdmin } from '../../../../interfaces/MatchInterface';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import LoadingOverlay from '../../../General/LoadingOverlay';
import StatusModal from '../../../General/StatusModal';
import ManageTournamentService from '../ManageTournamentService';
import ReviewSchedule from '../ReviewScheduleForm/ReviewSchedule';
import GridCardBase from './GridCardBase';

interface GridCardOngoingProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}

function GridCardOngoing({ tournament, formTournament, setFormTournament }:GridCardOngoingProps) {
  const [matches, setMatches] = React.useState<MatchForAdmin[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const openSchedule = () => {
    setLoading(true);
    ManageTournamentService.getLatestRoundID(tournament.tournamentID)
      .then((roundID:number) => ManageTournamentService.getMatchesNeedingScheduling(roundID))
      .then((data:any) => {
        setLoading(false);
        setMatches(data);
        setOpen(true);
      }).catch(() => {
        setLoading(false);
        setErrorModal(true);
      });
  };

  const handleDialogClose = () => {
    setOpen(false);
    setErrorModal(false);
  };

  return (
    <>
      <GridCardBase
        tournament={tournament}
        formTournament={formTournament}
        setFormTournament={setFormTournament}
        buttonName="View Schedule"
        onButtonClick={openSchedule}
        enableDelete={false}
        enableEdit
      />
      <ReviewSchedule
        open={open}
        setOpen={setOpen}
        matches={matches}
        setMatches={setMatches}
        tournament={tournament}
        enableEdit={false}
      />
      <StatusModal
        open={errorModal}
        handleDialogClose={handleDialogClose}
        dialogText="There was an error with retrieving the schedule.Please try again later or contact support."
        dialogTitle="Error"
        isError
      />
      <LoadingOverlay isOpen={loading} />
    </>
  );
}

export default GridCardOngoing;
