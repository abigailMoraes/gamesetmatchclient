import { Match, setMatchDetails } from '../../../interfaces/MatchInterface';
import handleErrors from '../../General/ServiceHelper';

const getAll = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/involves/user/${id}`)
  .then((response) => response.json());

const getPastMatches = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/history/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getMatchInformationByMatchID = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${id}`)
  .then((response) => response.json()).then((data) => setMatchDetails(data));

const confirmMatchAttendance = (id: number, mid: number) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/userAttendance`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance: 'Yes', userID: id, matchID: mid }),
  },
);

const dropOutOfMatch = (id: number, mid: number) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/userAttendance`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance: 'No', userID: id, matchID: mid }),
  },
);

const updateMatchAttendance = (id: number, mid: number, attendance:string) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/userAttendance`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance, userID: id, matchID: mid }),
  },
).then((resp) => handleErrors(resp));

const updateMatchResults = (id: number, mid: number, result: number) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/userResults`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results: result, userID: id, matchID: mid }),
  },
).then((resp) => handleErrors(resp));

const MatchService = {
  confirmMatchAttendance,
  getAll,
  getPastMatches,
  getMatchInformationByMatchID,
  dropOutOfMatch,
  updateMatchResults,
  updateMatchAttendance,
  setMatchDetails,
};

export default MatchService;
