import { Tournament } from '../../BrowseTournaments/TournamentsService';
import handleErrors from '../../General/ServiceHelper';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

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

const createTournament = (body: CreateTournamentRequestBody) => fetch(`${baseURL}/tournaments`, {
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

const updateTournament = (tournamentID:Number, body: UpdateTournamentRequestBody) => fetch(`${baseURL}/tournaments/${tournamentID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

const getUsersCreatedTournaments = (userID:number, status:number) => fetch(`${baseURL}/tournaments?status=${status}&createdBy=${userID}`)
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

const ManageTournamentService = {
  createTournament,
  updateTournament,
  getUsersCreatedTournaments,
};
export default ManageTournamentService;
