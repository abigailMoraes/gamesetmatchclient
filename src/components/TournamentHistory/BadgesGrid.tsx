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
  const [matchesPlayedAchievement, setMatchesPlayedAchievement] = useState<String>("");
  const [matchesWonAchievement, setMatchesWonAchievement] = useState<String>("");
  const [tournamentsPlayedAchievement, setTournamentsPlayedAchievement] = useState<String>("");
  const userID = useAtomValue(userIDAtom);
  
    
  useEffect(() => {
    MatchService.getPastMatches(userID).then((data) => {
      setMatches(data);
      let matchesPlayedAchieve = "";
      if(data.length < 10 ){
          matchesPlayedAchieve = "Novice Gamer"
      } else if (data.length < 20) {
          matchesPlayedAchieve = "Seasoned Gamer"
      } else {
          matchesPlayedAchieve = "Veteran Gamer"
      }
      setMatchesPlayedAchievement(matchesPlayedAchieve);
      let matchWins = data.filter((match:any) => match.results === 1);
      setMatchWins(data.filter((match:any) => match.results === 1));
      let matchesWonAchieve = "";
        if(matchWins.length < 10 ){
            matchesWonAchieve = "Bronze Award"
        } else if (matchWins.length < 20) {
            matchesWonAchieve = "Silver Award"
        } else {
            matchesWonAchieve = "Gold Award"
        }
      setMatchesWonAchievement(matchesWonAchieve);

    });
  }, []);

  useEffect(() => {
    TournamentService.getCompleted(userID).then((data) => {
      setTournaments(data);
      let tournamentsPlayed = ""
        if(data.length < 10 ){
            tournamentsPlayed = "Early Days"
        } else if (data.length < 20) {
            tournamentsPlayed = "Frequent Player"
        } else {
            tournamentsPlayed = "Tournament Aficionado"
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
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>{` ${tournamentsPlayedAchievement} `
            }</Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>{`${tournaments.length}
                  / ${tournaments.length}
                  
                   Tournaments Played
                  `
              }
              </Typography>)}
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
              <Typography variant="body1" style={{ textAlign: 'left' }}>{`
                  ${matchWins.length} / ${matchWins.length}    Matches Won`
              }
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
            title={(<Typography variant="h6" style={{ textAlign: 'left' }}>{` ${matchesPlayedAchievement} `}
            </Typography>)}
            subheader={(
              <Typography variant="body1" style={{ textAlign: 'left' }}>{`${matches.length} / ${matches.length}
                     Matches Played`
              }
              </Typography>)}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
export default BadgesGrid;
