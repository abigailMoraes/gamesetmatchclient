/* eslint-disable react/no-array-index-key */
import * as dates from 'date-arithmetic';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Slot, { SlotBox } from './Slot';

interface DayProps {
  date:Date,
  slots:boolean[],
  setSlots:(arg0:boolean[]) => void;
}

// TODO: create smoother transition when flipping between pages
const TransitioningStack = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  opacity: '1',
  transition: 'opacity 2s linear',
}));
function isWeekend(date:Date):boolean { return date.getDay() === 0 || date.getDay() === 6; }

const startTime = new Date();
const slotDuration = 30;

function getMinutes(date:Date):string {
  return date.getMinutes() > 1 ? `${date.getMinutes()}` : '00';
}
function slotStartTime(index:number):string {
  const date = dates.add(startTime, index * slotDuration, 'minutes');
  return `${date.getHours()}:${getMinutes(date)}`;
}

// function slotEndTime(index:number):string {
//   const date = dates.add(startTime, ((index + 1) * slotDuration), 'minutes');
//   return `${date.getHours()}:${getMinutes(date)}`;
// }

function getSlotInterval(index:number):string {
  return `${slotStartTime(index)}`;
}
// day has 24 slots from 9 am to 9pm
export function DayFirstColumn({ theme }:any) {
  startTime.setHours(9);
  startTime.setMinutes(0);
  startTime.setMilliseconds(0);
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body2" style={{ color: theme.palette.background.paper }}>emptyHeader</Typography>
      <Typography variant="body2" style={{ color: theme.palette.background.paper }}>emptyHeader</Typography>
      <div style={{
        borderRightColor: theme.palette.primary.contrastText,
        borderRightWidth: '2px',
      }}
      >
        {Array(24).fill(0).map((_, i) => (
          <SlotBox style={{
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.light,
          }}
          >
            <Typography variant="body2">
              {i % 2 === 0 ? getSlotInterval(i) : ''}
            </Typography>
          </SlotBox>
        ))}
      </div>
    </Stack>
  );
}
function Day({ date, slots, setSlots }:DayProps) {
  const theme = useTheme() as Theme;
  return (
    <TransitioningStack>
      <Typography variant="body2">{date.toLocaleString('default', { weekday: 'long' })}</Typography>
      <Typography variant="body2">{date.toLocaleString('default', { year: 'numeric', month: 'numeric', day: 'numeric' })}</Typography>

      {slots.map((isAvailable, index) => {
        if (isWeekend(date)) {
          return <SlotBox style={{ backgroundColor: theme.palette.primary.light, borderColor: theme.palette.primary.light }} />;
        }
        return (
          <Slot
            key={index}
            isSelected={isAvailable}
            setIsSelected={(isSelected) => {
              const updatedAvailabilty = [...slots];
              updatedAvailabilty[index] = isSelected;
              setSlots(updatedAvailabilty);
            }}
          />
        );
      })}
    </TransitioningStack>
  );
}

export default Day;
