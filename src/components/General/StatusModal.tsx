import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useTheme } from '@emotion/react';
import { Theme } from '@mui/material/styles';

interface StatusModalProps{
  open:boolean,
  handleDialogClose:() => void,
  dialogTitle:string,
  dialogText:string,
  isError:boolean
}

function StatusModal({
  open, handleDialogClose, dialogTitle, dialogText, isError,
}:StatusModalProps) {
  const theme = useTheme() as Theme;
  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ color: theme.palette.primary.main, alignItems: 'center', padding: '20px' }}
    >
      {isError ? <ErrorIcon fontSize="large" color="error" /> : <CheckCircleIcon fontSize="large" color="success" />}
      <DialogTitle id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: theme.palette.text.primary }} id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleDialogClose} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusModal;
