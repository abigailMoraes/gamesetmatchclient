import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/styles';
import { Theme, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';

export interface Match {
  matchID: Number,
  result: Number,
  startTime: Date,
  endTime: Date,
  duration: Number,
  type: String,
  name: String,
  location: String,
  description: String,
}

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

function MatchHistoryCard(props: any) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { match } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ width: '100%', backgroundColor: theme.palette.background.paper }}>
      <CardContent style={{ textAlign: 'left' }}>
        <Typography variant="h5">
          {match.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          {match.description}
        </Typography>
        <Typography variant="body2">
          {`Start Time: ${new Date(match.startTime).toLocaleDateString('en-US')}`}
        </Typography>
        <Typography variant="body2">
          {`End Time: ${new Date(match.endTime).toLocaleDateString('en-US')}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={handleClickOpen}>Details</Button>
      </CardActions>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
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
            <Detail label="Start Time" value={new Date(match.startTime).toLocaleDateString('en-US')} />
            <Detail label="End Time" value={new Date(match.endTime).toLocaleDateString('en-US')} />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="secondary">Update Results</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
export default MatchHistoryCard;
