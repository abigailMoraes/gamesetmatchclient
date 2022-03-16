import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useAtomValue } from 'jotai';
import StyledPaper from '../General/StyledPaper';
import BackButton from '../General/BackButton';
import StyledButton from '../General/StyledButton';
import AvailabilitySelector, { Availability, setUpDateRange } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';
import TournamentService, { RegisterForTournamentBody, Tournament } from './TournamentsService';
import StatusModal from '../General/StatusModal';
import { loginDataAtom } from '../../atoms/userAtom';

interface RegisterTournamentState {
  tournament:Tournament;
}

function RegisterTournament() {
  const location = useLocation();
  const state = location.state as RegisterTournamentState;
  const navigate = useNavigate();

  const { tournament } = state;
  const [roundAvailability, setRoundAvailability] = useState(setUpDateRange(tournament.startDate, 7200));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userData = useAtomValue(loginDataAtom);

  const submitRegistration = () => {
    setLoading(true);

    const registration:RegisterForTournamentBody = {
      userID: userData ? userData.id : -1,
      availabilities: roundAvailability,
    };

    TournamentService.registerForTournament(tournament.tournamentID, registration)
      .then(() => {
        setLoading(false);
        setOpen(true);
      })
      .catch(() => {
        setError(true);
        setOpen(true);
      });
  };

  const handleSuccessDialogClose = () => {
    navigate(-1);
  };

  const handleErrorDialogClose = () => {
    setOpen(false);
  };

  return (
    <StyledPaper>
      <Grid container spacing={2} direction="column" alignItems="flex-start">
        <Grid item>
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
        </Grid>
        <Grid item>
          <AvailabilitySelector
            availabilities={roundAvailability}
            setAvailabilities={(availabilties:Availability[]) => setRoundAvailability(availabilties)}
          />
        </Grid>
        <Grid item style={{ width: '100%' }} justifyContent="end">
          <StyledButton buttonText="Register" handleClick={submitRegistration} />
        </Grid>
      </Grid>
      {loading && <CircularProgress />}
      {error ? (
        <StatusModal
          open={open}
          handleDialogClose={handleErrorDialogClose}
          dialogText="There was an error with registration, please contact your administrator."
          dialogTitle="Error"
          isError={error}
        />
      ) : (
        <StatusModal
          open={open}
          handleDialogClose={handleSuccessDialogClose}
          dialogText="You have successfully registered for the tournament.
      After registration closes, you will recieve an e-mail containing the tournament schedule."
          dialogTitle="Registration Success!"
          isError={error}
        />
      )}
    </StyledPaper>
  );
}

export default RegisterTournament;
