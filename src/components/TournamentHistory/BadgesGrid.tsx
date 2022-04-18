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
import MatchService from '../Dashboard/Calendar/MatchService';
import { MatchResultTypes } from '../../interfaces/MatchInterface';

function BadgesGrid() {
  const [matchesPlayedAchievement, setMatchesPlayedAchievement] = useState<String>('');
  const [matchesPlayedNeededAchievement, setMatchesPlayedNeededAchievement] = useState(0);
  const [matchesWonAchievement, setMatchesWonAchievement] = useState<String>('');
  const [matchesWonNeededAchievement, setMatchesWonNeededAchievement] = useState(0);
  const [tournamentsPlayedAchievement, setTournamentsPlayedAchievement] = useState<String>('');
  const [tournamentsNeededAchievement, setTournamentsNeededAchievement] = useState(0);
  const userID = useAtomValue(userIDAtom);

  useEffect(() => {
    MatchService.getPastMatches(userID).then((data) => {
      let matchesPlayedAchieve = '';
      if (data.length >= 10) {
        matchesPlayedAchieve = 'Novice Gamer';
        setMatchesPlayedNeededAchievement(10);
      } else if (data.length >= 20) {
        matchesPlayedAchieve = 'Seasoned Gamer';
        setMatchesPlayedNeededAchievement(20);
      } else if (data.length >= 50) {
        matchesPlayedAchieve = 'Veteran Gamer';
        setMatchesPlayedNeededAchievement(50);
      } else {
        matchesPlayedAchieve = 'Matches Played';
        setMatchesPlayedNeededAchievement(data.length);
      }
      setMatchesPlayedAchievement(matchesPlayedAchieve);
      const wins = data.filter((match:any) => match.results === MatchResultTypes.Win);
      let matchesWonAchieve = '';
      setMatchesWonNeededAchievement(wins.length);
      if (wins.length >= 5) {
        matchesWonAchieve = 'Bronze Award';
        setMatchesWonNeededAchievement(5);
      } else if (wins.length >= 20) {
        matchesWonAchieve = 'Silver Award';
        setMatchesWonNeededAchievement(20);
      } else if (wins.length >= 50) {
        matchesWonAchieve = 'Gold Award';
        setMatchesWonNeededAchievement(50);
      } else {
        matchesWonAchieve = 'Matches Won';
        setMatchesWonNeededAchievement(wins.length);
      }
      setMatchesWonAchievement(matchesWonAchieve);
    });
  }, []);
  useEffect(() => {
    TournamentService.getCompleted(userID).then((data) => {
      let tournamentsPlayed = '';
      if (data.length >= 10) {
        tournamentsPlayed = 'Early Days';
        setTournamentsNeededAchievement(10);
      } else if (data.length >= 20) {
        tournamentsPlayed = 'Frequent Player';
        setTournamentsNeededAchievement(20);
      } else if (data.length >= 30) {
        tournamentsPlayed = 'Tournament Aficionado';
        setTournamentsNeededAchievement(30);
      } else {
        tournamentsPlayed = 'Tournaments Played';
        setTournamentsNeededAchievement(data.length);
      }
      setTournamentsPlayedAchievement(tournamentsPlayed);
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
            title={(
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                {` ${tournamentsPlayedAchievement} `}
              </Typography>
            )}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>
                {`${tournamentsNeededAchievement} / ${tournamentsNeededAchievement}    Tournaments Played`}
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
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>{` ${matchesWonAchievement} `}</Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>
                {`${matchesWonNeededAchievement} / ${matchesWonNeededAchievement}    Matches Won`}
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
            title={(
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                {`${matchesPlayedAchievement}`}
              </Typography>
            )}
            subheader={
              (
                <Typography variant="body1" style={{ textAlign: 'left' }}>
                  {`${matchesPlayedNeededAchievement} / ${matchesPlayedNeededAchievement}    Matches Played`}
                </Typography>
              )
          }
          />
        </Card>
      </Grid>
    </Grid>
  );
}
export default BadgesGrid;
