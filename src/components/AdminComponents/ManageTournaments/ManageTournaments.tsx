import Container from '@mui/material/Container';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAtomValue } from 'jotai';
import StyledButton from '../../General/StyledButton';
import TournamentForm from './TournamentForm';
import TournamentDisplayGrid, { TournamentRow } from '../../General/TournamentDisplayGrid';
import GridCardOpenForRegistration from './GridCardOpenForRegistration';
import { loginDataAtom } from '../../../atoms/userAtom';
import ManageTournamentService from './ManageTournamentService';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ManageTournaments() {
  const [value, setValue] = React.useState(0);
  const [tournaments, setTournaments] = React.useState<TournamentRow[]>([]);
  const [open, setOpen] = React.useState(false);
  const userData = useAtomValue(loginDataAtom);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openTournamentModal = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    ManageTournamentService.getUsersCreatedTournaments(userData.id, 0)
      .then((data) => setTournaments(data))
      .catch(() => console.log('error'));
  }, [value]);

  return (
    <Container>
      <Paper>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Manage your tournaments</Typography>
          </Grid>
          <Grid item px={4}>
            <StyledButton buttonText="+ Create Tournament" handleClick={openTournamentModal} />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab label="Open for Registration" {...a11yProps(0)} />
                <Tab label="Ready to Schedule" {...a11yProps(1)} />
                <Tab label="In Progress" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TournamentDisplayGrid
                gridTitle="Tournaments open for registration"
                tournaments={tournaments}
                GridCardComponent={<GridCardOpenForRegistration />}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Grid>
        </Grid>
        <TournamentForm open={open} setOpen={setOpen} />
      </Paper>
    </Container>
  );
}

export default ManageTournaments;
