/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';

interface StyledDatePickerProps {
  label:string,
  value:Date,
  onChange:(arg0:Date | null) => void,
  error?:boolean,
  disabled?:boolean,
  helperText?:any
}
function StyledDatePicker({
  label, value, onChange, error, helperText, disabled,
}:StyledDatePickerProps) {
  return (
    <Grid item xs={6}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{ textField: { variant: 'outlined', helperText, error } }}
        />
      </LocalizationProvider>
    </Grid>
  );
}

export default StyledDatePicker;
