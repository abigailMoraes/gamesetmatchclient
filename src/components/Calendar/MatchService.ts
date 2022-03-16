import { Match } from './MatchHistoryCard';

function setMatchDetails(item: Match) {
  return {
    id: item.matchID,
    result: item.result,
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

const getAll = (id:number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/match/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getPastMatches = (id:number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/match/history/involves/user/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const getMatchInformationByMatchID = (id:number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/match/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => setMatchDetails(item)));

const MatchService = {
  getAll, getPastMatches, getMatchInformationByMatchID,
};

export default MatchService;
