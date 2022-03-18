import React from 'react';
import { Tournament } from '../../../BrowseTournaments/TournamentsService';
import GridCardBase from './GridCardBase';

interface GridCardOpenForRegistrationProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}
function GridCardOpenForRegistration({ tournament, formTournament, setFormTournament }:GridCardOpenForRegistrationProps) {
  return (
    <GridCardBase
      tournament={tournament}
      formTournament={formTournament}
      setFormTournament={setFormTournament}
      enableDelete
      enableEdit
    />
  );
}

export default GridCardOpenForRegistration;
