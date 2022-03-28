import React from 'react';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import LoadingOverlay from '../../../General/LoadingOverlay';
import StatusModal from '../../../General/StatusModal';
import { TournamentRow } from '../ManageTournamentsEnums';
import ManageTournamentService from '../ManageTournamentService';
import GridCardBase from './GridCardBase';

interface GridCardOpenForRegistrationProps {
  tournament:Tournament
  tournamentRows: TournamentRow[],
  setTournamentRows:(arg0:TournamentRow[]) => void,
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}
function GridCardOpenForRegistration({
  tournament, tournamentRows, setTournamentRows, formTournament, setFormTournament,
}:GridCardOpenForRegistrationProps) {
  const [statusModalOpen, setStatusModalOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDialogClose = () => {
    setStatusModalOpen(false);
    if (!error) {
      const updatedRows = tournamentRows.filter((t:TournamentRow) => t.id !== tournament.tournamentID);
      setTournamentRows(updatedRows);
    }
    setError(false);
  };

  const closeRegistration = () => {
    setLoading(true);
    ManageTournamentService.closeRegistration(tournament.tournamentID).then(() => {
      setLoading(false);
      setStatusModalOpen(true);
    }).catch(() => {
      setLoading(false);
      setError(true);
      setStatusModalOpen(true);
    });
  };
  return (
    <>
      <GridCardBase
        tournament={tournament}
        formTournament={formTournament}
        setFormTournament={setFormTournament}
        buttonName="Close Registration"
        onButtonClick={closeRegistration}
        enableDelete={false}
        enableEdit
      />
      <StatusModal
        open={statusModalOpen}
        handleDialogClose={handleDialogClose}
        dialogText={error ? 'There was an error closing registration.Please try again later or contact support.'
          : "Tournament registration closed. Go to the 'Ready to Schedule' to continue."}
        dialogTitle={error ? 'Error' : 'Success'}
        isError={error}
      />
      <LoadingOverlay isOpen={loading} />
    </>
  );
}

export default GridCardOpenForRegistration;
