import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useTheme } from '@mui/styles';
import { Theme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import navigation from '../Navigation/navigation.json';
import { Tournament } from './TournamentsService';
import ViewRegistrants from './ViewRegistrants';

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

function RegistrationButton({ registered, handleClick }:any) {
  return (
    <Button
      size="small"
      color="secondary"
      onClick={handleClick}
      disabled={registered}
    >
      {registered ? 'Registered' : 'Register'}
    </Button>
  );
}

interface BrowseTournamentCardProps {
  tournament:Tournament,
}

function BrowseTournamentCard({ tournament }:BrowseTournamentCardProps) {
  const theme = useTheme() as Theme;
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const openDetails = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateToRegister = () => {
    setOpen(false);
    navigate(navigation.registerTournament, { state: { tournament } });
  };
  return (
    <Card style={{ width: '100%', backgroundColor: theme.palette.background.paper }}>
      <CardContent style={{ textAlign: 'left' }}>
        <Typography variant="h5">
          {tournament.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          {tournament.description}
        </Typography>
        <Typography variant="body2">
          {`Start Date: ${new Date(tournament.startDate).toLocaleDateString('en-US')}`}
        </Typography>
        <Typography variant="body2">
          {`Registration Closing Date: ${new Date(tournament.closeRegistrationDate).toLocaleDateString('en-US')}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={openDetails}>Details</Button>
        <RegistrationButton registered={tournament.registered} handleClick={navigateToRegister} />
      </CardActions>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogContent style={{ backgroundColor: theme.palette.primary.main }}>
          <Typography variant="h4" style={{ padding: '10px 0px 10px 0px' }}>
            {tournament.name}
          </Typography>
          <Typography variant="h6" style={{ padding: '5px 0px 5px 0px' }}>
            {tournament.description}
          </Typography>
          <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <Detail label="Location" value={tournament.location} />
            <Detail label="Format" value={tournament.format} />
            <Detail label="Start Date" value={new Date(tournament.startDate).toLocaleDateString('en-US')} />
            <Detail label="Register by" value={new Date(tournament.closeRegistrationDate).toLocaleDateString('en-US')} />
          </Container>
          <ViewRegistrants tournamentID={tournament.tournamentID} />
        </DialogContent>
        <DialogActions style={{ backgroundColor: theme.palette.primary.main }}>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <RegistrationButton registered={tournament.registered} handleClick={navigateToRegister} />
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default BrowseTournamentCard;
