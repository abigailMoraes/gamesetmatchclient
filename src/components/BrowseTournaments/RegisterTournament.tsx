import React from 'react';
import { useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import { Container } from '@mui/material';
import { Tournament } from './BrowseTournamentCard';
import StyledPaper from '../General/StyledPaper';
import BackButton from '../General/BackButton';

interface RegisterTournamentState {
  tournament:Tournament;
}
function RegisterTournament() {
  const location = useLocation();
  const state = location.state as RegisterTournamentState;
  const { tournament } = state;
  return (
    <Container>
      <StyledPaper>
        <BackButton />
        <Typography variant="h5">
          Registration
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">
              {tournament.name}
            </Typography>
            <Typography variant="body1">
              {tournament.description}
            </Typography>
          </CardContent>
        </Card>
      </StyledPaper>
    </Container>

  );
}

export default RegisterTournament;
