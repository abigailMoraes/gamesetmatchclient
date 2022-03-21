/* eslint-disable react/require-default-props */
import React from 'react';

import { useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Paper, Theme } from '@mui/material';
import { Tournament } from '../../../BrowseTournaments/TournamentsService';
import TournamentDetailsDialog from './TournamentDetailsDialog';
import TournamentForm from '../TournamentForm/TournamentForm';

interface GridCardManageTournamentBaseProps{
  tournament:Tournament,
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
  buttonName?:string,
  onButtonClick?:() => void,
  enableEdit:boolean,
  enableDelete:boolean
}

const deleteTournamentTooltip = (enabled:boolean, status:number):string => {
  if (enabled) return 'Delete';
  switch (status) {
    case 1:
      return 'Unable to delete a tournament in progress';
    default:
      return 'Delete';
  }
};
function GridCardManageTournamentBase({
  tournament, buttonName = '', onButtonClick, enableEdit, enableDelete, formTournament,
  setFormTournament,
}:GridCardManageTournamentBaseProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  // TODO
  // const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  // const [confirmDelete, setConfirmDelete] = React.useState(false);

  const [currentTournament, setCurrentTournament] = React.useState(tournament);
  const openDetails = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTournament = () => {
    // setOpenConfirmDelete(true);
  };

  const editTournament = () => {
    setFormTournament({ ...currentTournament });
    setOpenEdit(true);
  };

  return (
    <Paper style={{ width: '100%', backgroundColor: theme.palette.background.paper }}>
      <Grid
        container
        sx={{
          px: 2, py: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        }}
      >
        <Grid item style={{ textAlign: 'left' }}>
          <Typography variant="h5">
            {currentTournament.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            {currentTournament.description}
          </Typography>
          <Typography variant="body2">
            {`Start Date: ${new Date(currentTournament.startDate).toLocaleDateString('en-US')}`}
          </Typography>
          <Typography variant="body2">
            {`Registration Closing Date: ${new Date(currentTournament.closeRegistrationDate).toLocaleDateString('en-US')}`}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button size="small" color="secondary" onClick={openDetails}>Details</Button>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex', alignItems: 'center', pl: 1, pb: 1,
          }}
        >
          <Tooltip title={deleteTournamentTooltip(enableDelete, currentTournament.status)}>
            <span>
              <IconButton color="secondary" aria-label="delete" disabled={!enableDelete} onClick={deleteTournament}>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Edit">
            <span>
              <IconButton color="secondary" aria-label="edit" disabled={!enableEdit} onClick={editTournament}>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {buttonName && <Button size="small" color="secondary" onClick={onButtonClick}>{buttonName}</Button>}
          </Box>
        </Grid>
      </Grid>

      <TournamentDetailsDialog open={open} handleClose={handleClose} tournament={currentTournament} fullScreen={fullScreen} />
      <TournamentForm tournament={formTournament} setTournament={setCurrentTournament} open={openEdit} setOpen={setOpenEdit} />
    </Paper>
  );
}

export default GridCardManageTournamentBase;
