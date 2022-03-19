import React from 'react';
import { Tournament } from '../../../BrowseTournaments/TournamentsService';
import GridCardBase from './GridCardBase';

interface GridCardManageScheduleProps {
  tournament:Tournament
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
}
function GridCardManageSchedule({ tournament, formTournament, setFormTournament }:GridCardManageScheduleProps) {
  // TODO enable delete if its the first round only
  const openPublishSchedule = () => {

  };
  return (
    <GridCardBase
      tournament={tournament}
      formTournament={formTournament}
      setFormTournament={setFormTournament}
      buttonName="Publish Schedule"
      onButtonClick={openPublishSchedule}
      enableDelete={false}
      enableEdit
    />
  );
}

export default GridCardManageSchedule;
