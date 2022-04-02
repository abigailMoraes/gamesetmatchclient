import React, { useEffect, useState } from 'react';
import { SportsEsports, MilitaryTech, EmojiEvents } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  Avatar,
} from '@mui/material';

import { useAtomValue } from 'jotai';
import CardHeader from '@mui/material/CardHeader';
import { userIDAtom } from '../../atoms/userAtom';
import TournamentService from '../BrowseTournaments/TournamentsService';
import { Match } from '../Dashboard/Calendar/MatchInterface';
import MatchService from '../Dashboard/Calendar/MatchService';
import { Tournament } from '../../interfaces/TournamentInterface';

function BadgesGrid() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchWins, setMatchWins] = useState<Match[]>([]);
  const userID = useAtomValue(userIDAtom);

  useEffect(() => {
    MatchService.getPastMatches(userID).then((data) => {
      setMatches(data);
      setMatchWins(data.filter((match:any) => match.results === 'Win'));
    });
  }, []);

  useEffect(() => {
    TournamentService.getCompleted(userID).then((data) => {
      setTournaments(data);
    });
  }, []);

  return (
    <Grid
      container
      spacing={3}
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Grid item>
        <Card>
          <CardHeader
            avatar={(<Avatar><EmojiEvents /></Avatar>)}
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>Early Days</Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>
                {tournaments.length}
                /
                {tournaments.length}
                Tournaments Played
              </Typography>
)}
          />
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader
            avatar={(
              <Avatar>
                <MilitaryTech />
              </Avatar>
                  )}
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>Bronze Award</Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>

                {matchWins.length}
                /
                {matchWins.length}
                Matches Won
              </Typography>
                  )}
          />
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardHeader
            avatar={(
              <Avatar>
                <SportsEsports />
              </Avatar>
            )}
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>Frequent Player</Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>
                {matches.length}
                /
                {matches.length}
                Matches Played
              </Typography>
)}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
export default BadgesGrid;
