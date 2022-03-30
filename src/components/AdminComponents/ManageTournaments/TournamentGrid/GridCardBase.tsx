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
import { Tournament } from '../../../../interfaces/TournamentInterface';
import TournamentDetailsDialog from './TournamentDetailsDialog';
import TournamentForm from '../TournamentForm/TournamentForm';
import StatusModal from '../../../General/StatusModal';
import LoadingOverlay from '../../../General/LoadingOverlay';
import ManageTournamentService from '../ManageTournamentService';
import { TournamentStatus } from '../ManageTournamentsEnums';

interface GridCardManageTournamentBaseProps{
  tournament:Tournament,
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
  buttonName?:string,
  onButtonClick?:() => void,
  buttonName2?:string,
  onButtonClick2?:() => void,
  enableEdit:boolean,
  enableDelete:boolean,
  disabledButton1?:boolean,
  disabledButton2?:boolean,
  tooltip1?:string,
  tooltip2?:string,
  gridCardDetails?: React.ReactNode,
}

const deleteTournamentTooltip = (enabled:boolean, status:number):string => {
  if (enabled) return 'Delete';
  switch (status) {
    case TournamentStatus.TournamentOver:
      return 'Deleting a  finished tournament is not permitted';
    default:
      return 'Unable to delete a tournament in progress';
  }
};
function GridCardManageTournamentBase({
  tournament, buttonName = '', onButtonClick,
  buttonName2 = '', onButtonClick2,
  enableEdit, enableDelete, formTournament,
  setFormTournament,
  disabledButton1,
  disabledButton2,
  tooltip1 = '',
  tooltip2 = '',
  gridCardDetails,
}:GridCardManageTournamentBaseProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  // TODO
  // const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  // const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [statusModalOpen, setStatusModalOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDialogClose = () => {
    setStatusModalOpen(false);
    setLoading(false);
    setError(false);
  };

  const [currentTournament, setCurrentTournament] = React.useState(tournament);
  const openDetails = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTournament = () => {
    ManageTournamentService.deleteTournament(currentTournament.tournamentID).then(() => {
      setStatusModalOpen(true);
    }).catch(() => {
      setLoading(false);
      setError(true);
      setStatusModalOpen(true);
    });
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
          {gridCardDetails}
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
          <Tooltip title={deleteTournamentTooltip(enableDelete, currentTournament.status)} placement="top-start">
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
          <Grid sx={{ display: 'flex', flexDirection: 'column' }} spacing={4}>
            <Grid item>
              <Tooltip title={disabledButton1 ? tooltip1 : ''}>
                <span>
                  {buttonName && <Button size="small" color="secondary" disabled={disabledButton1} onClick={onButtonClick}>{buttonName}</Button>}
                </span>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={disabledButton2 ? tooltip2 : ''}>
                <span>
                  {buttonName2 && <Button size="small" color="secondary" disabled={disabledButton2} onClick={onButtonClick2}>{buttonName2}</Button>}
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TournamentDetailsDialog open={open} handleClose={handleClose} tournament={currentTournament} fullScreen={fullScreen} />
      <TournamentForm tournament={formTournament} setTournament={setCurrentTournament} open={openEdit} setOpen={setOpenEdit} />
      <StatusModal
        open={statusModalOpen}
        handleDialogClose={handleDialogClose}
        dialogText={error ? 'There was an error deleting the tournament.Please try again later or contact support.'
          : 'Tournament was deleted.'}
        dialogTitle={error ? 'Error' : 'Success'}
        isError={error}
      />
      <LoadingOverlay isOpen={loading} />
    </Paper>
  );
}

export default GridCardManageTournamentBase;
