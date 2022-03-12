import { Availability } from '../General/Calendar/AvailabilityCalendar/AvailabilitySelector';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api/tournament`;

export interface Tournament {
  tournamentID: Number,
  name: String,
  description: String,
  startDate: Date,
  location: String,
  maxParticipants: Number,
  prize: String,
  format: String,
  type: String,
  closeRegistrationDate: Date,
  matchDuration: Number,
  numberOfMatches: Number,
  roundDuration: Number,
  registered:boolean,
}

const getAll = () => fetch(baseURL)
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

const TournamentService = {
  getAll,
  registerForTournament,
};
export default TournamentService;
