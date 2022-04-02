
import { Tournament } from '../../interfaces/TournamentInterface';
import { Availability } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';
import { NumberQuery }  from '../TournamentHistory/SingleEliminationBracketMatch';
import handleErrors from '../General/ServiceHelper';
const baseURL = `${process.env.REACT_APP_API_DOMAIN}`;



export interface CompletedTournament{
  tournamentID: number,
  name: string,
  description: string,
  startDate: Date,
  location: string,
  maxParticipants: number,
  prize: string,
  format: number,
  series: number,
  closeRegistrationDate: Date,
  endDate: Date,
  matchDuration: number,
  numberOfMatches: number,
  roundDuration: number,
  registered:boolean,
}

const getAll = (userID:number) => fetch(`${baseURL}?registeredUser=${userID}&status=0`)
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

const registerForTournament = (tournamentID: Number, body: RegisterForTournamentBody) => fetch(`${baseURL}/
${tournamentID}/register`, {
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
  skillLevel: String,
}

const getRegistrants = (tournamentID:Number) => fetch(`${baseURL}/${tournamentID}/registrants`)
  .then((response) => response.json());

const getCompleted = (userID:number) => fetch(`${baseURL}/api/tournaments/user/${userID}/completed`)
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

const getNumberOfCompletedTournaments=(userID:number)=> fetch(`${baseURL}/api/tournaments
/user/${userID}/number/completed`).then((response)=>response.json()).then((data:NumberQuery)=> data)

const getNumberOfWonTournaments=(userID:number)=> fetch(`${baseURL}/api/tournaments
/user/${userID}/number/won`).then((response)=>response.json()).then((data:NumberQuery)=> data)


const TournamentService = {
  getAll,
  registerForTournament,
  getRegistrants,
  getCompleted, getNumberOfCompletedTournaments, getNumberOfWonTournaments,
};
export default TournamentService;
