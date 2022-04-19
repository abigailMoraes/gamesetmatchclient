/* eslint-disable max-len */

import SecurityService from '../../security/SecurityService';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Participant{
  id: string | number;
  isWinner: boolean;
  name?: string;
  status?: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string | null;
  resultText?: string | null;
}

export interface SingleBracketMatch {
  id: number;
  name?: string;
  nextMatchId: number | null;
  nextLooserMatchId?: number;
  tournamentRoundText: string;
  startTime: string;
  state: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string;
  participants: Participant[];
}

export interface RoundRobinMatch {
  id: number,
  round: number,
  match: number,
  tournamentRoundText: string;
  startTime: string,
  endTime: string,
  participants: string[],
  winner: string,
}

export interface NumberQuery{
  next: number | null | undefined;
}
export interface WinnerName{
  winner: number | null | undefined;
}

export interface RoundNumber{
  roundNumber: number | null | undefined;
}

export interface ParticipantName{
  name: String;
}
const getParticipantInformation = (matchID: number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${matchID}/userMatchInfo`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  // eslint-disable-next-line no-return-assign
  .then((response) => response.json()).then((data) => data.map((item:Participant) => ({
    id: item.id,
    isWinner: item.resultText === '1',
    name: item.name,
    status: item.status,
    // eslint-disable-next-line no-nested-ternary
    resultText: item.resultText === '1' ? 'Win' : item.resultText === '2' ? 'Loss' : item.resultText === '0' ? 'Tie' : 'TBD',
  })));

const getNextMatchIDSingleElimination = (roundID:number, matchID:number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/round/${roundID}/match/${matchID}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getNextMatchIDMultipleMatchesPerRound = (roundID:number, matchID:number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/match/${matchID}/next/winner/multiple`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getNextWinnerMatchID = (roundID: number, matchID: number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/match/${matchID}/next/winner`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getNextLoserMatchID = (roundID: number, matchID: number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/match/${matchID}/next/loser`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getRoundNumber = (roundID: number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/roundNumber`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:RoundNumber) => ({
    roundNumber: data.roundNumber,
  }));

const getWinner = (matchID: number) => SecurityService.authorizationToken()
  .then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${matchID}/winner`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }))
  .then((response) => response.json())
  .then((data:WinnerName) => ({
    name: data.winner,
  }));

const getRoundRobinTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await SecurityService.authorizationToken().then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }));
  const json = await response.json();
  return Promise.all(
    json.map(async (item: RoundRobinMatch) => {
      const players = await getParticipantInformation(item.id);
      const roundNumber = await getRoundNumber(Number(item.tournamentRoundText));
      const winner = await getWinner(item.id);
      return {
        id: item.id,
        round: roundNumber.roundNumber,
        match: item.id,
        tournamentRoundText: item.tournamentRoundText,
        startTime: item.startTime,
        endTime: item.endTime,
        participants: `${players[0].name}, ${players[1].name}`,
        winner: winner.name,
      };
    }),
  );
};

const getUpperBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await SecurityService.authorizationToken().then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }));
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const players = await getParticipantInformation(item.id);
      const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText), item.id);
      const nextLoserMatch = await getNextLoserMatchID(Number(item.tournamentRoundText), item.id);
      return {
        id: item.id,
        name: null,
        nextMatchId: nextMatch.next,
        nextLooserMatchId: nextLoserMatch.next,
        tournamentRoundText: item.tournamentRoundText,
        startTime: item.startTime,
        state: 'SCHEDULED',
        participants: players,
      };
    }),
  // eslint-disable-next-line max-len
  ).then((matches:SingleBracketMatch[]) => matches.filter((match) => ((match.nextMatchId == null && match.nextLooserMatchId == null) || (match.nextMatchId != null
          && match.nextLooserMatchId != null)))).then((filtered:SingleBracketMatch[]) => filtered);
};

const getLowerBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await SecurityService.authorizationToken().then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }));
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const players = await getParticipantInformation(item.id);
      const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText), item.id);
      const nextLoserMatch = await getNextLoserMatchID(Number(item.tournamentRoundText), item.id);
      return {
        id: item.id,
        name: null,
        nextMatchId: nextMatch.next,
        nextLooserMatchId: nextLoserMatch.next,
        tournamentRoundText: item.tournamentRoundText,
        startTime: item.startTime,
        state: 'SCHEDULED',
        participants: players,
      };
    }),
  ).then((matches:SingleBracketMatch[]) => matches.filter((match) => ((match.nextMatchId != null && match.nextLooserMatchId == null)))).then((filtered:SingleBracketMatch[]) => filtered);
};

const getBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await SecurityService.authorizationToken().then((idToken) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }));
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const players = await getParticipantInformation(item.id);
      const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText), item.id);
      return {
        id: item.id,
        name: null,
        nextMatchId: nextMatch.next,
        startTime: item.startTime,
        tournamentRoundText: item.tournamentRoundText,
        state: 'SCHEDULED',
        participants: players,
      };
    }),
  );
};

const BracketService = {
  getBracketTournamentMatchInfo,
  getUpperBracketTournamentMatchInfo,
  getLowerBracketTournamentMatchInfo,
  getParticipantInformation,
  getRoundRobinTournamentMatchInfo,
};

export default BracketService;
