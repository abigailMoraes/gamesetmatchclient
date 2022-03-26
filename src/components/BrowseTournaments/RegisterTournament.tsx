import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useAtomValue } from 'jotai';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import StyledPaper from '../General/StyledPaper';
import BackButton from '../General/BackButton';
import StyledButton from '../General/StyledButton';
import AvailabilitySelector, { Availability } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';
import TournamentService, { RegisterForTournamentBody } from './TournamentsService';
import StatusModal from '../General/StatusModal';
import { userIDAtom } from '../../atoms/userAtom';
import { Tournament } from '../../interfaces/TournamentInterface';
import { ReactBigCalendarEvent } from '../../interfaces/EventInterface';

interface RegisterTournamentState {
  tournament:Tournament;
}

const transformToAvailabilityString = (availabilites:ReactBigCalendarEvent[]):Availability[] => {
  const availStringObj:Availability[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const availForDay = availabilites.filter((a) => a.start.getDay() === i);
    const availArr = new Array(24).fill(0);
    availForDay.forEach((a) => {
      const sMoment = moment(a.start);
      const eMoment = moment(a.end);
      const sHour = a.start.getHours();
      const sMin = a.start.getMinutes();
      const duration = moment.duration(eMoment.diff(sMoment)).asMinutes() / 30;

      // 9 is start of day
      const index = (sHour - 9) * 2 + (sMin === 0 ? 0 : 1);

      // eslint-disable-next-line no-plusplus
      for (let j = index; j < index + duration; j++) {
        availArr[j] = 1;
      }
    });

    const availString = availArr.toString().replaceAll(',', '');
    availStringObj.push({
      day: i,
      slots: availString,
    });
  }
  return availStringObj;
};

function RegisterTournament() {
  const location = useLocation();
  const state = location.state as RegisterTournamentState;
  const navigate = useNavigate();

  const { tournament } = state;
  const [availabilities, setAvaliabilities] = useState<ReactBigCalendarEvent[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userID = useAtomValue(userIDAtom);

  const submitRegistration = () => {
    setLoading(true);

    const availabilityDTO:Availability[] = transformToAvailabilityString(availabilities);
    const registration:RegisterForTournamentBody = {
      userID,
      availabilities: availabilityDTO,
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

  React.useMemo(() => {
    setCanSubmit(availabilities.length !== 0);
    console.log(canSubmit);
  }, [availabilities]);

  return (
    <StyledPaper>
      <Grid container spacing={2} direction="column" alignItems="flex-start">
        <Grid item>
          <BackButton />
          <Card>
            <CardContent>
              <Typography variant="h6">
                {`Registration for:  ${tournament.name}`}
              </Typography>
              <Typography variant="body1">
                {`Location:  ${tournament.location}`}
              </Typography>
              <Typography variant="body1">
                {`Match Duration:  ${tournament.matchDuration}`}
              </Typography>
              <Typography variant="body1">
                {`Start Date:  ${tournament.startDate}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <AvailabilitySelector
            availabilities={availabilities}
            setAvailabilities={setAvaliabilities}
          />
        </Grid>
        <Grid item style={{ width: '100%' }} justifyContent="end">
          <Tooltip title={canSubmit ? '' : 'Please provide your availability'}>
            <span>
              <StyledButton buttonText="Register" handleClick={submitRegistration} disabled={!canSubmit} />
            </span>
          </Tooltip>
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
