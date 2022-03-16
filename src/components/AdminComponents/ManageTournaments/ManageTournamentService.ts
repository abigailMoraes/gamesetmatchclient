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

const createTournament = (body: CreateTournamentRequestBody) => fetch(`${baseURL}/tournament`, {
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

const updateTournament = (tournamentID:Number, body: UpdateTournamentRequestBody) => fetch(`${baseURL}/tournament/${tournamentID}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

const ManageTournamentService = {
  createTournament,
  updateTournament,
};
export default ManageTournamentService;
