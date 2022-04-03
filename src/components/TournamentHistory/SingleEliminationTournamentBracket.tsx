import React, { useEffect, useState } from 'react';
import { Match, SingleEliminationBracket, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import BracketService, { SingleBracketMatch } from './SingleEliminationBracketMatch';
import exampleMatches from './exampleMatches';
import { CompletedTournament } from '../BrowseTournaments/TournamentsService';
import { Theme, useTheme} from '@mui/material';

interface CompletedTournamentCardProps {
  tournament:CompletedTournament,
}

function SingleEliminationTournamentBracket({ tournament }: CompletedTournamentCardProps) {
  const [bracketMatches, setBracketMatches] = useState<SingleBracketMatch[]>(exampleMatches);
  
  useEffect(() => {
    async function fetchInformation() {
      const answer = await BracketService.getBracketTournamentMatchInfo(tournament.tournamentID);
      setBracketMatches(answer);
    }
    fetchInformation();
  }, []);

  return (
    <SingleEliminationBracket
      matches={bracketMatches}
      matchComponent={Match}
      // eslint-disable-next-line react/no-unstable-nested-components
      svgWrapper={({ children, ...props }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SVGViewer height={500} width={670} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
}

export default SingleEliminationTournamentBracket;
