import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const SlotBox = styled.div`
  width: 100px;
  height: 25px;
  border-width: 0.1px;
  border-style: full;
  padding-left: 4px;
  padding-top: 2px;
  justify-content: center;
  &.enabled:hover {
    cursor: pointer;
    border-width: 3px;
    border-style: full;
    border-color: #FFF;
  }
`;

interface SlotProps {
  isSelected: boolean;
  setIsSelected: (arg0: boolean) => void;
}

function Slot({
  isSelected, setIsSelected,
}:SlotProps) {
  const theme = useTheme() as Theme;
  const colour = isSelected ? theme.palette.secondary.main : theme.palette.primary.main;

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <SlotBox className="enabled" style={{ backgroundColor: colour, borderColor: theme.palette.primary.light }} onClick={handleClick} />
  );
}

export default Slot;
