import React from 'react';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/styles';
import {
  DialogActions, Grid, Theme, useMediaQuery,
} from '@mui/material';
import Container from '@mui/material/Container';
import { AttendanceType, MatchForAdmin } from '../../../interfaces/MatchInterface';

import StyledButton from '../StyledButton';
import StyledSelect from '../StyledSelect';
import MatchService from '../../Calendar/MatchService';
import StatusModal from '../StatusModal';

interface MatchDetailsProps {
  match:MatchForAdmin,
  setMatch:(arg0:MatchForAdmin) => void,
  open:boolean,
  setOpen:(arg0:boolean) => void,
  isEditable:boolean,
}

const getResults = (match:MatchForAdmin) => {
  const result = match.participants[0]?.results;

  switch (result) {
    case 0:
      return 0;
    case 1:
      return match.playerOneID;
    case 2:
      return match.playerTwoID;
    default:
      return -1;
  }
};
function MatchDetails({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  match, setMatch, open, setOpen, isEditable,
}:MatchDetailsProps) {
  const theme = useTheme() as Theme;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [playerOneAttendance, setPlayerOneAttendance] = React.useState<number>(match.participants[0]
    ? AttendanceType.indexOf(match.participants[0]?.attendance) : 0);
  const [playerTwoAttendance, setPlayerTwoAttendance] = React.useState<number>(match.participants[1]
    ? AttendanceType.indexOf(match.participants[1]?.attendance) : 0);

  const [winner, setWinner] = React.useState<number>();

  const [resultUpdate, setResultUpdate] = React.useState(false);
  const [resultUpdateError, setResultUpdateError] = React.useState(false);
  const [resultUpdateText, setResultUpdateText] = React.useState('');

  const [p1AttendanceUpdate, setP1AttendanceUdpate] = React.useState(false);
  const [p1AttendanceUpdateError, setP1AttendanceUdpateError] = React.useState(false);
  const [p1AttendanceText, setP1AttendanceText] = React.useState('');

  const [p2AttendanceUpdate, setP2AttendanceUdpate] = React.useState(false);
  const [p2AttendanceUpdateError, setP2AttendanceUdpateError] = React.useState(false);
  const [p2AttendanceText, setP2AttendanceText] = React.useState('');

  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [statusModalText, setStatusModalText] = React.useState('');
  const [updateMatchError, setUpdateMatchError] = React.useState(false);
  //   const userID:number = useAtomValue(userIDAtom);
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setStatusModalText('');
    setResultUpdateError(false);
    setUpdateMatchError(false);
    setP2AttendanceUdpate(false);
    setP2AttendanceUdpateError(false);
    setP1AttendanceUdpate(false);
    setP1AttendanceUdpateError(false);
    setResultUpdate(false);
    setResultUpdateText('');
    setP1AttendanceText('');
    setP2AttendanceText('');
    if (winner !== getResults(match)) {
      let res:number;

      if (winner === -1 || winner === 0) {
        res = winner;
      } else {
        res = winner === match.playerOneID ? 1 : 2;
      }

      MatchService.updateMatchResults(match.playerOneID, match.matchID, res)
        .then(() => {
          setResultUpdate(true);
          const updatedMatch = match;
          updatedMatch.participants[0].results = res;
          setMatch(updatedMatch);
          setResultUpdateText('Result successfully updated.');
        })
        .catch((err:Error) => {
          setResultUpdateError(true);
          setResultUpdate(true);
          setResultUpdateText(err.message);
        });
    }

    if (playerOneAttendance !== AttendanceType.indexOf(match.participants[0]?.attendance)) {
      MatchService.updateMatchAttendance(match.playerOneID, match.matchID, AttendanceType[playerOneAttendance])
        .then(() => {
          setP1AttendanceUdpate(true);
          const updatedMatch = match;
          updatedMatch.participants[0].attendance = AttendanceType[playerOneAttendance];
          setMatch(updatedMatch);
          setP1AttendanceText(`${match.participants[0]?.name} attendance successfully saved`);
        })
        .catch((err: Error) => {
          setP1AttendanceUdpateError(true);
          setP1AttendanceUdpate(true);
          setP1AttendanceText(err.message);
        });
    }

    if (playerTwoAttendance !== AttendanceType.indexOf(match.participants[1]?.attendance)) {
      MatchService.updateMatchAttendance(match.playerTwoID, match.matchID, AttendanceType[playerTwoAttendance])
        .then(() => {
          setP2AttendanceUdpate(true);
          const updatedMatch = match;
          updatedMatch.participants[1].attendance = AttendanceType[playerTwoAttendance];
          setMatch(updatedMatch);
          setP2AttendanceText(`${match.participants[1]?.name} attendance successfully saved`);
        })
        .catch((err:Error) => {
          setP2AttendanceUdpateError(true);
          setP2AttendanceUdpate(true);
          setP2AttendanceText(err.message);
        });
    }
  };

  React.useMemo(() => {
    setOpenStatusModal(resultUpdate || p1AttendanceUpdate || p2AttendanceUpdate);
    setUpdateMatchError(resultUpdateError || p1AttendanceUpdateError || p2AttendanceUpdateError);
    setStatusModalText(`${resultUpdateText}\n${p1AttendanceText}\n${p2AttendanceText}`);
  }, [(p2AttendanceUpdate || p1AttendanceUpdate || resultUpdate)]);

  React.useEffect(() => {
    setWinner(getResults(match));
    setPlayerOneAttendance(AttendanceType.indexOf(match.participants[0]?.attendance));
    setPlayerTwoAttendance(AttendanceType.indexOf(match.participants[1]?.attendance));
  }, [open]);

  const winnerOptions = [{ value: -1, text: 'Pending' }, { value: 0, text: 'Tie' },
    { value: match.playerOneID, text: `${match.participants[0]?.name}` },
    { value: match.playerTwoID, text: `${match.participants[1]?.name}` }];

  return (
    (
      <>
        <Dialog
          fullScreen={fullScreen}
          onClose={handleClickClose}
          open={open}
          style={{ color: theme.palette.primary.main, minHeight: '50vh', minWidth: '80vw' }}
        >
          <DialogContent>
            <Typography component="span" variant="h4" style={{ padding: '10px 0px 10px 0px' }}>
              {match.name}
            </Typography>
            <Container style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" style={{ padding: '10px 0px 10px 0px' }}>
                {`
              ${new Date(match.startTime).toLocaleTimeString(
                  'en-US',
                  {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  },
                )} - ${new Date(match.endTime).toLocaleTimeString(
                  'en-US',
                  { hour: '2-digit', minute: '2-digit' },
                )}`}
              </Typography>
              <Grid container spacing={2} display="flex">
                <StyledSelect
                  id="player1Attendance"
                  label={`${match.participants[0]?.name} Attending?`}
                  selectOptions={AttendanceType.map((text:string, index:number) => ({ value: index, text }))}
                  value={playerOneAttendance}
                  onChange={(e) => setPlayerOneAttendance(e.target.value)}
                  width={6}
                  disabled={isEditable}
                />
                <StyledSelect
                  id="playerTwoAttendance"
                  label={`${match.participants[1]?.name} Attending?`}
                  selectOptions={AttendanceType.map((text:string, index:number) => ({ value: index, text }))}
                  value={playerTwoAttendance}
                  onChange={(e) => setPlayerTwoAttendance(e.target.value)}
                  width={6}
                  disabled={isEditable}
                />
                <StyledSelect
                  id="results"
                  label="Winner"
                  selectOptions={winnerOptions}
                  value={winner}
                  onChange={(e) => setWinner(e.target.value)}
                  width={6}
                  disabled={isEditable}
                />
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <StyledButton buttonText="Close" handleClick={handleClickClose} />
            {!isEditable && <StyledButton buttonText="Update" handleClick={handleUpdate} />}
          </DialogActions>
        </Dialog>
        <StatusModal
          open={openStatusModal}
          handleDialogClose={(() => setOpenStatusModal(false))}
          dialogTitle={`Updates were ${updateMatchError ? 'not' : ''} successful`}
          dialogText={statusModalText}
          isError={updateMatchError}
        />
      </>
    )
  );
}

export default MatchDetails;
