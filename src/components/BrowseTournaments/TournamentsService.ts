import { Tournament } from '../../interfaces/TournamentInterface';
import { TournamentStatus } from '../AdminComponents/ManageTournaments/ManageTournamentsEnums';
import { Availability } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';
import handleErrors from '../General/ServiceHelper';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api/tournaments`;

export interface CompletedTournament{
  tournamentID: number,
  name: string,
  description: string,
  startDate: Date,
  location: string,
  maxParticipants: number,
  prize: string,
  format: number,
  type: number,
  closeRegistrationDate: Date,
  endDate: Date,
  matchDuration: number,
  numberOfMatches: number,
  roundDuration: number,
  registered:boolean,
}

const getAll = (userID:number) => fetch(`${baseURL}?registeredUser=${userID}&status=${TournamentStatus.OpenForRegistration}`)
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

export interface RegisterForTournamentBody {
  userID: number,
  availabilities: Availability[]
  skillLevel?: number;
}

const registerForTournament = (tournamentID: Number, body: RegisterForTournamentBody) => fetch(`${baseURL}/${tournamentID}/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then((resp) => handleErrors(resp));

export interface Registrant {
  userID: Number,
  name: String,
  email: String,
  skillLevel: number,
}

const getRegistrants = (tournamentID:Number) => fetch(`${baseURL}/${tournamentID}/registrants`)
  .then((response) => response.json());

const getCompleted = (userID:number) => fetch(`http://localhost:8080/api/tournaments/${userID}/completed`)
  .then((response) => response.json())
  .then((data) => data.map((item: CompletedTournament) => ({
    id: item.tournamentID,
    name: item.name,
    description: item.description,
    location: item.location,
    startDate: item.startDate,
    numberOfMatches: item.numberOfMatches,
    prize: item.prize,
    allTournamentDetails: item,
  })));

const TournamentService = {
  getAll,
  registerForTournament,
  getRegistrants,
  getCompleted,
};
export default TournamentService;
