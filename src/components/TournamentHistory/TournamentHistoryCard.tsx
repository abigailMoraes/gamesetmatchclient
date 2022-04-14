import React from 'react';
import PlayerStats from './PlayerStats';
import CompletedTournamentsGrid from './CompletedTournamentsGrid';

function TournamentHistoryCard() {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <div style={{ width: '80%' }}>
        <PlayerStats />
      </div>
      <div style={{ width: '40%' }}>
        <CompletedTournamentsGrid />
      </div>
    </div>
  );
}

export default TournamentHistoryCard;
