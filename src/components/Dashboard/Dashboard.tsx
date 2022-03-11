import React from 'react';
// import { Theme, useTheme } from '@mui/material';
import CalendarCard from '../Calendar/CalendarCard';
import MatchHistoryGrid from '../Calendar/MatchHistoryGrid';

import './Dashboard.css';

function Dashboard() {
  // const theme = useTheme() as Theme;
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <div style={{
        width: '75%', padding: '1px', fontFamily: 'Maven Pro',
      }}
      >
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Abel', color: '#e6e6e6' }}>Upcoming Tournaments</h2>
        <CalendarCard />
      </div>
      <div style={{ width: '25%', padding: '5px' }}><MatchHistoryGrid /></div>
    </div>
  );
}

export default Dashboard;
