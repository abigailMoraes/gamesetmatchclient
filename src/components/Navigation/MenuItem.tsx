import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface MenuItemParams {
  id:string,
  label: string,
  route:string,
  icon: React.ReactNode;
}

function MenuItem({
  id, label, route, icon,
}:MenuItemParams) {
  const navigate = useNavigate();

  const routeToPage = () => {
    navigate(route);
  };
  return (
    <ListItem button id={id} onClick={routeToPage}>
      <ListItemIcon>
        <div style={{ color: '#D27C2C' }}>
          {icon}
        </div>
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: '#fff', fontFamily: 'Maven Pro, sans-serif' }}>{label}</Typography>} />
    </ListItem>
  );
}

export default MenuItem;
