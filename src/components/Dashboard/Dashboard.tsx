import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAtomValue } from 'jotai';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import CalendarCard from './Calendar/CalendarCard';

import './Dashboard.css';
import { userIDAtom } from '../../atoms/userAtom';
import { Match } from '../../interfaces/MatchInterface';
import LoadingOverlay from '../General/LoadingOverlay';
import OverviewTabs from './OverviewGrid/OverviewTabs';
import MatchService from './Calendar/MatchService';

function Dashboard() {
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [loading, setLoading] = React.useState(false);
  const userID = useAtomValue(userIDAtom);
  const theme = useTheme() as Theme;

  React.useEffect(() => {
    setLoading(true);
    MatchService.getAll(userID)
      .then((data) => {
        setLoading(false);
        setMatches(data);
      });
  }, []);

  return (
    <Paper sx={{ py: 2, backgroundColor: theme.palette.primary.main, alignContent: 'left' }}>
      <Grid
        container
        spacing={1}
        sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
        }}
      >
        <Grid item xs={12} sx={{ mx: 4 }}>
          <Typography variant="h4" textAlign="left">At a glance... </Typography>
        </Grid>

        <LoadingOverlay isOpen={loading} />
        <Grid item>
          <CalendarCard matches={matches} setMatches={setMatches} />
        </Grid>
        <Grid item sx={{ maxHeight: '85vh' }}>
          <OverviewTabs matches={matches} setMatches={setMatches} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Dashboard;
