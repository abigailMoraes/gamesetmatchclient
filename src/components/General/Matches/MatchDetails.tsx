import React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/styles';
import { Theme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { Match } from '../../../interfaces/MatchInterface';

import DialogDetail from '../DialogDetail';
import { User } from '../../../interfaces/User';

interface MatchDetailsProps {
  match:Match,
  setMatch:(arg0:Match) => void,
  participants:User[],
  open:boolean,
  setOpen:(arg0:boolean) => void,
}

function MatchDetails({
  match, setMatch, participants, open, setOpen,
}:MatchDetailsProps) {
  console.log(match);
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  //   const userID:number = useAtomValue(userIDAtom);
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleConfirmAttendance = () => {
    setMatch(match);
    //   MatchService.confirmMatchAttendance(userID, match.matchID).then(() => (match.attendance));
  };

  const handleDropOut = () => {
    //   MatchService.dropOutOfMatch(userID, match.matchID).then(() => ());
  };

  return (
    (
      <Dialog
        fullScreen={fullScreen}
        onClose={handleClickClose}
        open={open}
        style={{ color: theme.palette.primary.main, minHeight: '50vh', minWidth: '80vw' }}
      >
        <DialogContent>
          <Typography variant="h4" style={{ padding: '10px 0px 10px 0px' }}>
            {match.name}
          </Typography>
          <Typography variant="h6" style={{ padding: '5px 0px 5px 0px' }}>
            {match.description}
          </Typography>
          <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <DialogDetail label="Location" value={match.location} />
            <DialogDetail label="Round" value={match.roundNumber} />
            <DialogDetail
              label="Start Time"
              value={new Date(match.startTime).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' },
              )}
            />
            <DialogDetail
              label="End Time"
              value={new Date(match.endTime).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' },
              )}
            />
            <DialogDetail label="Result" value={match.results} />
            <DialogDetail label="Attendance" value={match.attendance} />
            <Typography style={{ display: 'inline-flex' }} variant="body1">Participants:</Typography>
            <div>{participants.map((participant:User) => <Typography variant="body1">{participant.name}</Typography>)}</div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClickClose}>Cancel</Button>
          {match.results === 'Pending' && match.attendance === 'No'
            ? <Button color="secondary" onClick={handleConfirmAttendance}>Confirm Attendance</Button> : null}
          {match.results === 'Pending' && match.attendance === 'Yes'
            ? <Button color="secondary" onClick={handleDropOut}>Drop Out</Button> : null}
        </DialogActions>
      </Dialog>
    )
  );
}

export default MatchDetails;
