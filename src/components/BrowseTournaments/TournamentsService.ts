import { Availability } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api/tournaments`;

export interface Tournament {
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
  matchDuration: number,
  numberOfMatches: number,
  roundDuration: number,
  status:number,
  adminHostsTournament:number,
  registered:boolean,
}

const getAll = (userID:number) => fetch(`${baseURL}?registeredUser=${userID}`)
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
  skillLevel?: string;
}

const registerForTournament = (tournamentID: Number, body: RegisterForTournamentBody) => fetch(`${baseURL}/${tournamentID}/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export interface Registrant {
  userID: Number,
  name: String,
  email: String,
  skillLevel: String,
}

const getRegistrants = (tournamentID:Number) => fetch(`${baseURL}/${tournamentID}/registrants`)
  .then((response) => response.json());

const TournamentService = {
  getAll,
  registerForTournament,
  getRegistrants,
};
export default TournamentService;
