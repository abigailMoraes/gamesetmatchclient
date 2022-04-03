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
import { CompletedTournament } from '../BrowseTournaments/TournamentsService';
import SingleEliminationTournamentBracket from './SingleEliminationTournamentBracket';
import DoubleElimination from './DoubleEliminationTournamentBracket';
import ReactVirtualizedTable from './RoundRobinTable';

interface IDetail {
  label:String,
  value:any
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

interface CompletedTournamentCardProps {
  tournament:CompletedTournament,
}

function CompletedTournamentCard({ tournament }:CompletedTournamentCardProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line eqeqeq
  const isSingleElimination = tournament.format == 2;
  // eslint-disable-next-line eqeqeq
  const isDoubleElimination = tournament.format == 3;
  // eslint-disable-next-line eqeqeq
  const isRoundRobin = tournament.format == 1;
  
  const openDetails = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {`Number Of Matches: ${tournament.numberOfMatches}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={openDetails}>Details</Button>
      </CardActions>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        PaperProps={{
          style: {
            minHeight: '90vh',
            maxHeight: '90vh',
            minWidth: '100vh',
            maxWidth: '100vh',
          },
        }}
      >
        <DialogContent style={{
          backgroundColor: theme.palette.primary.main,
        }}
        >
          <Typography variant="h4" style={{ padding: '10px 0px 10px 0px' }}>
            {tournament.name}
          </Typography>
          {isSingleElimination && <SingleEliminationTournamentBracket tournament={tournament} />}
          {isDoubleElimination && <DoubleElimination tournament={tournament} />}
          {isRoundRobin && <ReactVirtualizedTable tournament={tournament} />}
        </DialogContent>
        <DialogActions style={{ backgroundColor: theme.palette.primary.main }}>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default CompletedTournamentCard;
