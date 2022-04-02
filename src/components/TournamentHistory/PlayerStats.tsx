import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { CChart } from '@coreui/react-chartjs';
import Typography from '@mui/material/Typography';
import { userIDAtom } from '../../atoms/userAtom';
import BadgesGrid from './BadgesGrid';
import MatchService from '../Dashboard/Calendar/MatchService';
import { Match } from '../Dashboard/Calendar/MatchInterface';

function PlayerStats() {
  const [matchWins, setMatchWins] = useState<Match[]>([]);
  const [matchLosses, setMatchLosses] = useState<Match[]>([]);
  const [matchDraws, setMatchDraws] = useState<Match[]>([]);
  const [matchPending, setMatchPending] = useState<Match[]>([]);
  const userID = useAtomValue(userIDAtom);

  useEffect(() => {
    MatchService.getPastMatches(userID).then((data) => {
      setMatchWins(data.filter((match:any) => match.results === 'Win'));
      setMatchDraws(data.filter((match:any) => match.results === 'Draw'));
      setMatchLosses(data.filter((match:any) => match.results === 'Loss'));
      setMatchPending(data.filter((match:any) => match.results === 'Pending'));
    });
  }, []);

  return (
    <div>
      <Typography variant="body1" style={{ fontSize: '1.5rem', fontFamily: 'Abel', color: 'rgb(230, 230, 230)' }}>
        Tournament History
      </Typography>
      <div style={{ width: '100%', alignItems: 'center' }}>
        <BadgesGrid />
      </div>
      <Typography variant="body1" style={{ fontSize: '1.5rem', fontFamily: 'Abel', color: 'rgb(230, 230, 230)' }}>
        Matches Played
      </Typography>
      <div style={{ display: 'inline-flex', width: '40%', padding: '20px' }}>
        <CChart
          title="Matches Played"
          style={{ display: 'inline-flex', width: '100%' }}
          type="doughnut"
          data={{
            labels: ['Won', 'Lost', 'Draw', 'Pending'],
            datasets: [
              {
                backgroundColor: ['#e6e6e6', '#61DAFB', '#27293C', '#cb742e'],
                data: [matchWins.length, matchLosses.length, matchDraws.length, matchPending.length],
              },
            ],
          }}
        />
      </div>
      <Typography variant="body1" style={{ fontSize: '1.5rem', fontFamily: 'Abel', color: 'rgb(230, 230, 230)' }}>
        Tournaments Played
      </Typography>
      <div style={{ display: 'inline-flex', width: '40%', padding: '20px' }}>
        <CChart
          title="Tournaments Played"
          style={{ display: 'inline-flex', width: '100%' }}
          type="doughnut"
          data={{
            labels: ['Wins', 'Loss', 'Draws'],
            datasets: [
              {
                backgroundColor: ['#e6e6e6', '#61DAFB', '#27293C'],
                data: [40, 50, 10],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
export default PlayerStats;
