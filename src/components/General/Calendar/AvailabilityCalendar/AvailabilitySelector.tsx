import moment from 'moment';
import React from 'react';
import * as dates from 'date-arithmetic';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import Day, { DayFirstColumn } from './Day';

interface AvailabilitySelectorProps {
  availabilities:Availability[],
  setAvailabilities:(arg0:Availability[]) => void;
}

export type Availability = {
  date:Date;
  slots:boolean[]
};
const daysPerView = 5;
const roundMinutesToDays = (roundDuration:number) => {
  const duration = moment.duration(roundDuration, 'minutes');
  return duration.asDays();
};

export function setUpDateRange(startDate:Date, roundDuration:number):Availability[] {
  let days = roundMinutesToDays(roundDuration);
  const range:Availability[] = [];
  let i = 0;
  while (i < days) {
    const currDate = dates.add(startDate, i, 'day');
    const dayOfWeek = currDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      days += 1;
    }

    range.push({
      date: currDate,
      slots: Array(24).fill(false),
    });
    i += 1;
  }
  return range;
}

function AvailabilitySelector({ availabilities, setAvailabilities }:AvailabilitySelectorProps) {
  const theme = useTheme() as Theme;

  const startOfRange = (page:number) => (page - 1) * daysPerView;
  const endOfRange = (page:number) => page * daysPerView;

  const [page, setPage] = React.useState(1);
  const [visibleDays, setVisibleDays] = React.useState(availabilities.slice(startOfRange(page), endOfRange(page)));
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setVisibleDays(availabilities.slice(startOfRange(value), endOfRange(value)));
  };

  const count = Math.ceil(availabilities.length / daysPerView);
  // TODO: make the pagination responsive
  // TODO: drag selection?
  return (
    <Paper>
      <Typography variant="h6" style={{ padding: '10px' }}>
        Provide your availability
      </Typography>
      <Typography variant="body2" style={{ paddingLeft: '10px' }}>
        *Drag selection is not implemented*
      </Typography>
      <Grid container justifyContent="center" spacing={2} pt={3}>
        <Grid container justifyContent="center">
          <DayFirstColumn theme={theme} />
          {visibleDays.map((availability, index) => (
            <Day
              date={availability.date}
              slots={availability.slots}
              setSlots={(slots:boolean[]) => {
                const updatedAvailabilites = [...availabilities];
                updatedAvailabilites[index].slots = slots;
                setAvailabilities(updatedAvailabilites);
              }}
            />
          ))}
        </Grid>
        <Pagination count={count} page={page} onChange={handleChange} />
      </Grid>
    </Paper>
  );
}

export default AvailabilitySelector;
