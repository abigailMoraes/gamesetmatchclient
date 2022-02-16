import { Tournament } from './BrowseTournamentCard';

const getAll = () => fetch('http://localhost:8080/api/tournament')
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
