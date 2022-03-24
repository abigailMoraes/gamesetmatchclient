import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/styles';
import { useAtomValue } from 'jotai';
import { Theme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { userIDAtom } from '../../atoms/userAtom';
import { User } from './MatchHistoryCard';
import MatchService from './MatchService';

interface IDetail {
  label:String,
  value:String
}

function Detail({ label, value }:IDetail) {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Typography variant="body1">
        {label}
        :
      </Typography>
      <Typography variant="body1" style={{ paddingLeft: '5px' }}>
        {value}
      </Typography>
    </div>
  );
}

interface IMatchHistoryDialogProps{
  match: any;
  participants:User[];
}

function MatchHistoryDialogue(props: IMatchHistoryDialogProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const userID:number = useAtomValue(userIDAtom);
  const { match, participants } = props;
  const [open, setOpen] = useState(true);

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleConfirmAttendance = () => {
    MatchService.confirmMatchAttendance(userID, match.id).then(() => (window.location.reload()));
  };

  const handleDropOut = () => {
    MatchService.dropOutOfMatch(userID, match.id).then(() => (window.location.reload()));
  };

  return (
    (
      <Dialog
        fullScreen={fullScreen}
        onClose={handleClickClose}
        open={open}
        style={{ color: theme.palette.primary.main }}
      >
        <DialogContent>
          <Typography variant="h4" style={{ padding: '10px 0px 10px 0px' }}>
            {match.name}
          </Typography>
          <Typography variant="h6" style={{ padding: '5px 0px 5px 0px' }}>
            {match.description}
          </Typography>
          <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <Detail label="Location" value={match.location} />
            <Detail label="Round" value={match.type} />
            <Detail
              label="Start Time"
              value={new Date(match.startTime).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' },
              )}
            />
            <Detail
              label="End Time"
              value={new Date(match.endTime).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' },
              )}
            />
            <Detail label="Result" value={match.results} />
            <Detail label="Attendance" value={match.attendance} />
            <Typography style={{ display: 'inline-flex' }} variant="body1">Participants:</Typography>
            <div>{participants.map((participant) => <Typography variant="body1">{participant.name}</Typography>)}</div>
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

export default MatchHistoryDialogue;
