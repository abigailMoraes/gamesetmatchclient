import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
// import { Theme, useTheme } from '@mui/material';
import CalendarCard from '../Calendar/CalendarCard';
import MatchHistoryGrid from '../Calendar/MatchHistoryGrid';

import './Dashboard.css';

// TODO: pull hard coded styling to a theme
function Dashboard() {
  return (
    <Paper>
      <Grid
        container
        spacing={2}
        sx={{
          px: 2, py: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Typography variant="h5"> Your upcoming matches</Typography>
          <CalendarCard />
        </Grid>
        <Grid item>
          <MatchHistoryGrid />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Dashboard;
