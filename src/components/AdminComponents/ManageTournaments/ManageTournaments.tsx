/* eslint-disable react/jsx-props-no-spreading */
import Container from '@mui/material/Container';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAtomValue } from 'jotai';
import TournamentForm from './TournamentForm/TournamentForm';
import TournamentDisplayGrid from './TournamentGrid/TournamentDisplayGrid';
import { loginDataAtom } from '../../../atoms/userAtom';
import {
  GridCardTypes, TabNames, TournamentRow, TournamentStatus,
} from './ManageTournamentsEnums';
import ManageTournamentService from './ManageTournamentService';
import { Tournament } from '../../../interfaces/TournamentInterface';
import StyledButton from '../../General/StyledButton';

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

function statusesBasedOnTab(value:number):number[] {
  switch (value) {
    case TabNames.ManageSchedule:
      return [TournamentStatus.RegistrationClosed,
        TournamentStatus.ReadyToPublishSchedule,
        TournamentStatus.ReadyToPublishNextRound];
    case TabNames.Ongoing:
      return [TournamentStatus.Ongoing, TournamentStatus.FinalRound];
    case TabNames.Over:
      return [TournamentStatus.TournamentOver];
    default:
      return [TournamentStatus.OpenForRegistration];
  }
}

function ManageTournaments() {
  const [value, setValue] = React.useState(0);
  const [tournamentRows, setTournamentRows] = React.useState<TournamentRow[]>([]);
  const [open, setOpen] = React.useState(false);
  const userData = useAtomValue(loginDataAtom);
  const [formTournament, setFormTournament] = React.useState<Tournament | undefined>(undefined);
  const [gridUpate, setGridUpdate] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openTournamentForm = () => {
    setFormTournament(undefined);
    setOpen(!open);
  };

  React.useMemo(() => {
    ManageTournamentService.getUsersCreatedTournaments(userData.id, statusesBasedOnTab(value))
      .then((data) => setTournamentRows(data))
      .catch(() => console.log('error'));
    setGridUpdate(false);
  }, [value, gridUpate]);

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 2 }}>
        <Grid container maxWidth="md" spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Manage your tournaments</Typography>
          </Grid>
          <Grid item px={4}>
            <StyledButton buttonText="+ Create Tournament" handleClick={openTournamentForm} variant="contained" />
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
                <Tab label="Finished" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={TabNames.OpenForRegistration}>
              <TournamentDisplayGrid
                formTournament={formTournament}
                setFormTournament={setFormTournament}
                gridTitle=""
                tournamentRows={tournamentRows}
                setTournamentRows={setTournamentRows}
                gridCardComponentName={GridCardTypes.OpenForRegistration}
              />
            </TabPanel>
            <TabPanel value={value} index={TabNames.ManageSchedule}>
              <TournamentDisplayGrid
                formTournament={formTournament}
                setFormTournament={setFormTournament}
                gridTitle=""
                tournamentRows={tournamentRows}
                setTournamentRows={setTournamentRows}
                gridCardComponentName={GridCardTypes.ManageSchedule}
              />
            </TabPanel>
            <TabPanel value={value} index={TabNames.Ongoing}>
              <TournamentDisplayGrid
                formTournament={formTournament}
                setFormTournament={setFormTournament}
                gridTitle=""
                tournamentRows={tournamentRows}
                setTournamentRows={setTournamentRows}
                gridCardComponentName={GridCardTypes.Ongoing}
              />
            </TabPanel>
            <TabPanel value={value} index={TabNames.Over}>
              <TournamentDisplayGrid
                formTournament={formTournament}
                setFormTournament={setFormTournament}
                gridTitle=""
                tournamentRows={tournamentRows}
                setTournamentRows={setTournamentRows}
                gridCardComponentName={GridCardTypes.Over}
              />
            </TabPanel>
          </Grid>
        </Grid>
        <TournamentForm tournament={formTournament} currentTab={value} updateGrid={setGridUpdate} open={open} setOpen={setOpen} />
      </Paper>
    </Container>
  );
}

export default ManageTournaments;
