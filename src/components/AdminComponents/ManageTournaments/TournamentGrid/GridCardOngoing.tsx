import React from 'react';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import GridCardBase from './GridCardBase';

interface GridCardOngoingProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}

function GridCardOngoing({ tournament, formTournament, setFormTournament }:GridCardOngoingProps) {
  return (
    <GridCardBase
      tournament={tournament}
      formTournament={formTournament}
      setFormTournament={setFormTournament}
      enableDelete={false}
      enableEdit
    />
  );
}

export default GridCardOngoing;
