import { Paper, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import React from 'react';
import { loginDataAtom } from '../../../atoms/userAtom';

function ManageTournaments() {
  const userData = useAtomValue(loginDataAtom);
  return (
    <Paper>
      {userData.isAdmin >= 1 ? <Typography>ManageTournaments</Typography>
        : <Typography>You are unauthorized to view this page.</Typography>}
    </Paper>
  );
}

export default ManageTournaments;
