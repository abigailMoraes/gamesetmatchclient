import React from 'react';
import Button from '@mui/material/Button';

interface IStyledButton {
  buttonText:string;
  handleClick:React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function StyledButton({ buttonText, handleClick }:IStyledButton) {
  return (
    <Button size="small" color="secondary" onClick={handleClick}>{buttonText}</Button>
  );
}

export default StyledButton;
