import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAtomValue } from 'jotai';
import React from 'react';
import { loginDataAtom } from '../../../atoms/userAtom';

function ManageUsers() {
  const userData = useAtomValue(loginDataAtom);
  return (
    <Paper>
      {userData.isAdmin >= 1 ? <Typography>Manage Users</Typography>
        : <Typography>You are unauthorized to view this page.</Typography>}
    </Paper>
  );
}

export default ManageUsers;
