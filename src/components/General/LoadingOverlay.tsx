import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface LoadingOverlayProps {
  isOpen:boolean
}
function LoadingOverlay({ isOpen }:LoadingOverlayProps) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingOverlay;
