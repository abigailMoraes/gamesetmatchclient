import { Tournament } from './BrowseTournamentCard';

const getAll = () => fetch(`${process.env.REACT_APP_GOOGLE_API_DOMAIN}/api/tournament`)
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

const TournamentService = {
  getAll,
};
export default TournamentService;
