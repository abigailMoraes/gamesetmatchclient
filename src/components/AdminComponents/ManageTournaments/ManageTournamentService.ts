import { Match } from '../../../interfaces/MatchInterface';
import { Tournament } from '../../../interfaces/TournamentInterface';
import handleErrors from '../../General/ServiceHelper';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

const baseTournamentsURL = `${process.env.REACT_APP_API_DOMAIN}/api/tournaments`;

const saveUpdatedSchedule = (tournamentID:number, roundID: number, matches: Match[]) => fetch(`${baseTournamentsURL}/${tournamentID}/round/${roundID}
`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(matches),

}).then((resp) => handleErrors(resp));

const publishSchedule = (matches:Match[]) => fetch(`${baseTournamentsURL}/publish
`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(matches),

}).then((resp) => handleErrors(resp));

const createSchedule = (tournamentID:number) => fetch(`${baseURL}/${tournamentID}/runCreateSchedule`, {
  method: 'POST',
}).then((resp) => handleErrors(resp));

interface CreateTournamentRequestBody {
  name: string,
  description: string,
  startDate: Date,
  location: string,
  prize: string,
  format: number,
  type: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  numberOfMatches: number,
  adminHostsTournament:number
}

const createTournament = (body: CreateTournamentRequestBody) => fetch(`${baseTournamentsURL}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

interface UpdateTournamentRequestBody {
  name: string,
  description: string,
  startDate: Date,
  location: string,
  prize: string,
  format: number,
  type: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  numberOfMatches: number,
}

const updateTournament = (tournamentID:Number, body: UpdateTournamentRequestBody) => fetch(`${baseTournamentsURL}/${tournamentID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

const getUsersCreatedTournaments = (userID:number, status:number) => fetch(`${baseTournamentsURL}?status=${status}&createdBy=${userID}`)
  .then((response) => response.json())
  .then((data) => data.map((item: Tournament) => ({
    id: item.tournamentID,
    name: item.name,
    description: item.description,
    location: item.location,
    startDate: item.startDate,
    closeRegistrationDate: item.closeRegistrationDate,
    allTournamentDetails: item,
  })));

const getMatchesNeedingScheduling = (roundID:number) => fetch(`${baseURL}/rounds/${roundID}/matches`)
  .then((response) => response.json())
  .then((data) => data.map((item: Match) => ({
    id: item.matchID,
    startTime: item.startTime,
    name: `${item.playerOneName} vs ${item.playerTwoName}`,
    endTime: item.endTime,
    roundID: item.roundID,
  })));

const ManageTournamentService = {
  createTournament,
  updateTournament,
  getUsersCreatedTournaments,
  createSchedule,
  publishSchedule,
  saveUpdatedSchedule,
  getMatchesNeedingScheduling,
};
export default ManageTournamentService;
