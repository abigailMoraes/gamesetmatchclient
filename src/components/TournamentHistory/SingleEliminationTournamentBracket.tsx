import React, { useEffect, useState } from 'react';
import {
  Match, SingleEliminationBracket, SVGViewer,
} from '@g-loot/react-tournament-brackets';
import BracketService, { SingleBracketMatch } from './SingleEliminationBracketMatch';
import { CompletedTournament } from '../BrowseTournaments/TournamentsService';

interface CompletedTournamentCardProps {
  tournament:CompletedTournament,
  bracketMatchList:SingleBracketMatch[],
}

function SingleEliminationTournamentBracket({ tournament, bracketMatchList }: CompletedTournamentCardProps) {
  return (
    <SingleEliminationBracket
      matches={bracketMatchList}
      matchComponent={Match}
      // eslint-disable-next-line react/no-unstable-nested-components
      svgWrapper={({ children, ...props }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SVGViewer height={500} width={650} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
}

export default SingleEliminationTournamentBracket;
