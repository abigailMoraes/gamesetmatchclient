import { Match, MatchForAdmin } from '../../../interfaces/MatchInterface';
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

const publishSchedule = (matches:Match[]) => fetch(`${baseURL}/publish
`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(matches),

}).then((resp) => handleErrors(resp));

const createSchedule = (tournamentID:number) => fetch(`${baseTournamentsURL}/${tournamentID}/runCreateSchedule`, {
  method: 'POST',
}).then((resp) => handleErrors(resp));

interface CreateTournamentRequestBody {
  name: string,
  description: string,
  startDate: Date,
  location: string,
  prize: string,
  format: number,
  matchBy: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  series: number,
  adminHostsTournament:number
}

const createTournament = (body: CreateTournamentRequestBody) => fetch(`${baseTournamentsURL}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

const closeRegistration = (tournamentID:number) => fetch(`${baseTournamentsURL}/${tournamentID}/closeRegistration`, {
  method: 'PUT',
}).then((resp) => handleErrors(resp));

interface UpdateTournamentRequestBody {
  name: string,
  description: string,
  startDate: Date,
  location: string,
  prize: string,
  format: number,
  matchBy: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  series: number,
}

const updateTournament = (tournamentID:Number, body: UpdateTournamentRequestBody) => fetch(`${baseTournamentsURL}/${tournamentID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

const getUsersCreatedTournaments = (userID:number, status:number[]) => fetch(`${baseTournamentsURL}?createdBy=${userID}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ statuses: status }),
})
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
  .then((data) => data.map((item: MatchForAdmin) => ({
    matchID: item.matchID,
    name: `${item.participants[0].name} vs. ${item.participants[1].name}`,
    startTime: new Date(item.startTime),
    endTime: new Date(item.endTime),
    roundID: item.roundID,
    isConflict: item.isConflict,
    playerOneID: item.playerOneID,
    playerTwoID: item.playerTwoID,
    participants: item.participants,
  })));

const DeleteTournamentErrorCodes = {
  SEND_EMAIL_ERROR_MAIL: 'Tournament was deleted, but there was an error notifying registrants. Please check your mail configurations.',
  SEND_EMAIL_ERROR_MESSAGING: 'Tournament was deleted, but there was an error notifying registrants.',
};
const deleteTournament = (tournamentID:number) => fetch(`${baseTournamentsURL}/${tournamentID}`, {
  method: 'DELETE',
}).then((resp) => handleErrors(resp));

const getLatestRoundID = (tournamentID:number) => fetch(`${baseTournamentsURL}/${tournamentID}/rounds`)
  .then((resp) => handleErrors(resp))
  .then((response:any) => response.json())
  .then((data:any) => {
    const latestRound = data.reduce((acc:any, curr:any) => ((acc.roundNumber - curr.roundNumber > 0) ? acc : curr), {});
    return latestRound.roundID;
  });

interface CheckNewMatchTime {
  newMatchAsAvailabilityString:string,
  dayOfWeek:number,
}

const checkNewMatchTime = (
  tournamentID:number,
  matchID:number,
  newMatchInfo:CheckNewMatchTime,
) => fetch(`${baseTournamentsURL}/${tournamentID}/match/${matchID}/checkNewTime`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMatchInfo),
}).then((resp) => handleErrors(resp));

const ManageTournamentService = {
  createTournament,
  updateTournament,
  getUsersCreatedTournaments,
  createSchedule,
  publishSchedule,
  saveUpdatedSchedule,
  getMatchesNeedingScheduling,
  closeRegistration,
  deleteTournament,
  getLatestRoundID,
  checkNewMatchTime,
  DeleteTournamentErrorCodes,
};
export default ManageTournamentService;
