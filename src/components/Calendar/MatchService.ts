import { Match } from './MatchInterface';

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

const getAll = (id: number) => fetch(`http://localhost:8080/api/match/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getPastMatches = (id: number) => fetch(`http://localhost:8080/api/match/history/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getMatchInformationByMatchID = (id: number) => fetch(`http://localhost:8080/api/match/${id}`)
  .then((response) => response.json()).then((data) => setMatchDetails(data));

const confirmMatchAttendance = (id: number, mid: number) => fetch(
  `http://localhost:8080/api/match/confirm/${id}/${mid}`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance: 'Yes', userID: id, matchID: mid }),
  },
);

const dropOutOfMatch = (id: number, mid: number) => fetch(
  `http://localhost:8080/api/match/dropOut/${id}/${mid}`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attendance: 'No', userID: id, matchID: mid }),
  },
);

const updateMatchResults = (id: number, mid: number, result: String) => fetch(
  `http://localhost:8080/api/match/update/results/${id}/${mid}`,
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results: result, userID: id, matchID: mid }),
  },
);

const MatchService = {
  confirmMatchAttendance, getAll, getPastMatches, getMatchInformationByMatchID, dropOutOfMatch, updateMatchResults,
};

export default MatchService;
