import { DoubleEliminationBracket, SVGViewer, Match } from '@g-loot/react-tournament-brackets';
import React, {useEffect, useState } from 'react';
import { CompletedTournament } from '../BrowseTournaments/TournamentsService';
import exampleMatches from './exampleMatches';
import BracketService, { SingleBracketMatch } from './SingleEliminationBracketMatch';

interface CompletedTournamentCardProps {
  tournament:CompletedTournament,
}

export default  function DoubleElimination({tournament}: CompletedTournamentCardProps) {
  const exampleDoubleEliminationMatches = {
    upper: [
      {
        id: 20512,
        name: 'UB Semi Final',
        nextMatchId: 20515,
        nextLooserMatchId: 20502,
        tournamentRoundText: 'UB 3',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'a3c107d2-ded2-4f33-85e7-2215805f664b',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'BTC',
          },
          {
            id: 'a3fb4b05-d4ee-4efe-84cf-b500cdbdbbe0',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'Towby',
          },
        ],
      },
      {
        id: 20513,
        name: 'UB 2.1',
        nextMatchId: 20512,
        nextLooserMatchId: 20506,
        tournamentRoundText: 'UB 2',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '8cf422cd-a99d-4184-b2cd-70ee481f46b3',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'GlootOne',
          },
          {
            id: 'a3fb4b05-d4ee-4efe-84cf-b500cdbdbbe0',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'Towby',
          },
        ],
      },
      {
        id: 20514,
        name: 'UB 1.2',
        nextMatchId: 20513,
        nextLooserMatchId: 20505,
        tournamentRoundText: 'UB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'a3fb4b05-d4ee-4efe-84cf-b500cdbdbbe0',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'Towby',
          },
          {
            id: '12046e66-adbf-49d9-98c1-bed16d5ced29',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'Alex',
          },
        ],
      },
      {
        id: 20515,
        name: 'Final',
        nextMatchId: null,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'UB 4',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'SeatloN',
          },
          {
            id: 'a3fb4b05-d4ee-4efe-84cf-b500cdbdbbe0',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'Towby',
          },
        ],
      },
      {
        id: 20508,
        name: 'UB 1.4',
        nextMatchId: 20510,
        nextLooserMatchId: 20503,
        tournamentRoundText: 'UB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'dd6c4bff-80da-449c-8bfa-24c835af013a',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'OmarDev',
          },
          {
            id: 'a3c107d2-ded2-4f33-85e7-2215805f664b',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'BTC',
          },
        ],
      },
      {
        id: 20509,
        name: 'UB 1.1',
        nextMatchId: 20513,
        nextLooserMatchId: 20505,
        tournamentRoundText: 'UB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '8cf422cd-a99d-4184-b2cd-70ee481f46b3',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'GlootOne',
          },
          {
            id: 'e1e48aad-5e29-41dc-b904-16f152a7ec74',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'spacefudg3',
          },
        ],
      },
      {
        id: 20510,
        name: 'UB 2.2',
        nextMatchId: 20512,
        nextLooserMatchId: 20504,
        tournamentRoundText: 'UB 2',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'a3c107d2-ded2-4f33-85e7-2215805f664b',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'BTC',
          },
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'SeatloN',
          },
        ],
      },
      {
        id: 20511,
        name: 'UB 1.3',
        nextMatchId: 20510,
        nextLooserMatchId: 20503,
        tournamentRoundText: 'UB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'SeatloN',
          },
          {
            id: 'fabb2218-49d6-41a2-874c-d6cd6928df70',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'jackieboi',
          },
        ],
      },
    ],
    lower: [
      {
        id: 20502,
        name: 'LB Semi Final',
        nextMatchId: 20515,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 4',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'a3c107d2-ded2-4f33-85e7-2215805f664b',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'BTC',
          },
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'SeatloN',
          },
        ],
      },
      {
        id: 20503,
        name: 'LB 1.2',
        nextMatchId: 20506,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'dd6c4bff-80da-449c-8bfa-24c835af013a',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'OmarDev',
          },
          {
            id: 'fabb2218-49d6-41a2-874c-d6cd6928df70',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'jackieboi',
          },
        ],
      },
      {
        id: 20504,
        name: 'LB 2.1',
        nextMatchId: 20507,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 2',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'SeatloN',
          },
          {
            id: 'e1e48aad-5e29-41dc-b904-16f152a7ec74',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'spacefudg3',
          },
        ],
      },
      {
        id: 20505,
        name: 'LB 1.1',
        nextMatchId: 20504,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 1',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'e1e48aad-5e29-41dc-b904-16f152a7ec74',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'spacefudg3',
          },
          {
            id: '12046e66-adbf-49d9-98c1-bed16d5ced29',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'Alex',
          },
        ],
      },
      {
        id: 20506,
        name: 'LB 2.2',
        nextMatchId: 20507,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 2',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: 'fabb2218-49d6-41a2-874c-d6cd6928df70',
            resultText: '1',
            isWinner: false,
            status: 'PLAYED',
            name: 'jackieboi',
          },
          {
            id: '8cf422cd-a99d-4184-b2cd-70ee481f46b3',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'GlootOne',
          },
        ],
      },
      {
        id: 20507,
        name: 'LB 3.1',
        nextMatchId: 20502,
        nextLooserMatchId: undefined,
        tournamentRoundText: 'LB 3',
        startTime: 'August 05, 2021',
        state: 'SCORE_DONE',
        participants: [
          {
            id: '3d1a5ddb-85b7-4724-b94d-8747454d66e9',
            resultText: '2',
            isWinner: true,
            status: 'PLAYED',
            name: 'SeatloN',
          },
          {
            id: '8cf422cd-a99d-4184-b2cd-70ee481f46b3',
            resultText: '0',
            isWinner: false,
            status: 'PLAYED',
            name: 'GlootOne',
          },
        ],
      },
    ],
  };


  const [upperBracketMatches, setUpperBracketMatches] = useState<SingleBracketMatch[]>(exampleMatches);
  const [lowerBracketMatches, setLowerBracketMatches] = useState<SingleBracketMatch[]>(exampleMatches);
  const [doubleBracketMatches, setDoubleBracketMatches] = useState<{
    upper: SingleBracketMatch[],
    lower: SingleBracketMatch[]
  }>(exampleDoubleEliminationMatches);

  useEffect(() => {
    async function fetchInformation() {
      const answerUpper = await BracketService.getUpperBracketTournamentMatchInfo(tournament.tournamentID);
      const answerLower = await BracketService.getLowerBracketTournamentMatchInfo(tournament.tournamentID);
      setUpperBracketMatches(answerUpper);
      setLowerBracketMatches(answerLower);
      setDoubleBracketMatches({upper: answerUpper, lower:answerLower,});
      console.log(doubleBracketMatches);
    }

    fetchInformation();
    console.log(doubleBracketMatches);
  }, []);

  console.log(doubleBracketMatches);
  return (
      <DoubleEliminationBracket
          matches={doubleBracketMatches}
          matchComponent={Match}
          svgWrapper={({children, ...props}) => (
              <SVGViewer width={670} height={500} {...props}>
                {children}
              </SVGViewer>
          )}
      />
  );
}

