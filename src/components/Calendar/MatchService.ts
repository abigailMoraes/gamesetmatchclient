import { Match } from './MatchHistoryCard';

function setMatchDetails(item: Match) {
  return {
    results: item.results,
    attendance: item.attendance,
    id: item.matchID,
    startTime: item.startTime,
    endTime: item.endTime,
    duration: item.duration,
    type: item.type,
    name: item.name,
    location: item.location,
    description: item.description,
    allMatchDetails: item,
  };
}

const getAll = () => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/involves/user/1`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getPastMatches = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/history/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getMatchInformationByMatchID = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${id}`)
  .then((response) => response.json()).then((data) => setMatchDetails(data));

const confirmMatchAttendance = (id: number, mid: number) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/confirm/${id}/${mid}`,
  { method: 'PUT' },
).then((response) => response.json()).then((resp) => { console.warn(resp); });

const dropOutOfMatch = (id: number, mid: number) => fetch(
  `${process.env.REACT_APP_API_DOMAIN}/api/match/dropOut/${id}/${mid}`,
  { method: 'PUT' },
).then((response) => response.json()).then((resp) => { console.warn(resp); });

const MatchService = {
  confirmMatchAttendance, getAll, getPastMatches, getMatchInformationByMatchID, dropOutOfMatch,
};

export default MatchService;
