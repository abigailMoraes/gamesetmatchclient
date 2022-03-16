/* eslint-disable react/require-default-props */
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

interface SelectProps {
  value:number,
  text:string,
}
interface StyledSelectProps {
  id:string,
  label:string,
  onChange:(arg0:SelectChangeEvent) => void,
  selectOptions:SelectProps[],
  value:any
  width?:number,
  required?:boolean
}

function StyledSelect({
  id, label, onChange, selectOptions, value, width = 12, required = false,
}:StyledSelectProps) {
  return (
    <Grid item xs={width}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={`simple-select-${id}`}
        value={value}
        label={label}
        onChange={onChange}
        fullWidth
        required={required}
      >
        {selectOptions.map((item:SelectProps) => <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>)}
      </Select>
    </Grid>
  );
}

export default StyledSelect;
