import { Match } from './MatchHistoryCard';

const getAll = () => fetch('http://localhost:8080/api/match/involves/user/1')
  .then((response) => response.json()).then((data) => data.map((item:Match) => ({
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
  })));

const getPastMatches = () => fetch('http://localhost:8080/api/match/history/involves/user/1')
  .then((response) => response.json()).then((data) => data.map((item:Match) => ({
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
  })));

const getMatchInformationByMatchID = (id:number) => fetch(`http://localhost:8080/api/match/${id}`)
  .then((response) => response.json()).then((data) => data.map((item:Match) => ({
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
  })));

const MatchService = {
  getAll, getPastMatches, getMatchInformationByMatchID,
};

export default MatchService;
