import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import styled from '@emotion/styled';

export interface Tournament {
  tournamentID: Number,
  name: String,
  description: String,
  startDate: Date,
  location: String,
  maxParticipants: Number,
  prize: String,
  format: String,
  type: String,
  closeRegistrationDate: Date,
  matchDuration: Number,
  numberOfMatches: Number,
}

const StyledTypography = styled(Typography)`
   && {
    color: #fff;
    font-family: 'Abel', sans-serif;
    text-align: left;
   }
`;

function BrowseTournamentCard(props: any) {
  const { tournament } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card style={{ width: '100%', backgroundColor: '#27293C' }}>
      <CardContent>
        <StyledTypography variant="h5">
          {tournament.name}
        </StyledTypography>
        <StyledTypography sx={{ mb: 1.5 }}>
          {tournament.description}
        </StyledTypography>
        <StyledTypography variant="body2">
          {`Start Date: ${new Date(tournament.startDate).toLocaleDateString('en-US')}`}
        </StyledTypography>
        <StyledTypography variant="body2">
          {`Registration Closing Date: ${new Date(tournament.closeRegistrationDate).toLocaleDateString('en-US')}`}
        </StyledTypography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>Details</Button>
      </CardActions>
      <Dialog open={open} onClose={handleClose} style={{ color: '#2F3241' }}>
        <DialogTitle>{tournament.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Description: ${tournament.description}`}
            <br />
            {`Location: ${tournament.location}`}
            <br />
            {`Prize: ${tournament.prize}`}
            <br />
            {`Format: ${tournament.format}`}
            <br />
            {`Type: ${tournament.type}`}
            <br />
            {`Start Date: ${new Date(tournament.startDate).toLocaleDateString('en-US')}`}
            <br />
            {`Registration Closing Date: ${new Date(tournament.closeRegistrationDate).toLocaleDateString('en-US')}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Register</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default BrowseTournamentCard;
