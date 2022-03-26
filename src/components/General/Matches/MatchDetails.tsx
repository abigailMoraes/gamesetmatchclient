import React from 'react';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/styles';
import { Theme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { Match } from '../../../interfaces/MatchInterface';

import DialogDetail from '../DialogDetail';
import { User } from '../../../interfaces/User';

interface MatchDetailsProps {
  match:Match,
  setMatch:(arg0:Match) => void,
  open:boolean,
  setOpen:(arg0:boolean) => void,
}

function MatchDetails({
  match, setMatch, open, setOpen,
}:MatchDetailsProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  //   const userID:number = useAtomValue(userIDAtom);
  const handleClickClose = () => {
    setOpen(false);
  };

  // const handleConfirmAttendance = () => {
  //   setMatch(match);
  //   //   MatchService.confirmMatchAttendance(userID, match.matchID).then(() => (match.attendance));
  // };

  // const handleDropOut = () => {
  //   //   MatchService.dropOutOfMatch(userID, match.matchID).then(() => ());
  // };

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
          <Container style={{ display: 'flex', flexDirection: 'column' }}>
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
          </Container>
        </DialogContent>
      </Dialog>
    )
  );
}

export default MatchDetails;
