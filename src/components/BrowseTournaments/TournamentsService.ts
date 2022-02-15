import { Tournament } from "./BrowseTournamentCard";
import { TournamentRow } from "./BrowseTournamentsGrid";

export const getAllTournaments = () => {
    return fetch("http://localhost:8080/api/tournament")
    .then((response) => response.json())
    .then((data:Tournament[]) => data.map(item => {
        return { id: item.tournamentID,
        name: item.name,
        description: item.description,
        location: item.location,
        startDate: item.startDate,
        closeRegistrationDate: item.closeRegistrationDate,
        allTournamentDetails: item,
        }
    }));
}