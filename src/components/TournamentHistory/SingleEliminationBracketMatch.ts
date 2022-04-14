/* eslint-disable max-len */
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
const getParticipantInformation = (matchID: number, winnerID: NumberQuery) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/
${matchID}/userMatchInfo`)
  .then((response) => response.json()).then((data) => data.map((item:Participant) => ({
    id: item.id,
    isWinner: item.id == winnerID.next,
    name: item.name,
    status: item.status,
    resultText:item.id == winnerID.next ? 'Win' : 'Loss',
  })));


const getNextWinnerMatchID = (roundID: number, matchID: number) => fetch(`
${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/match/${matchID}/next/winner`)
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getNextLoserMatchID = (roundID: number, matchID: number) => fetch(`
${process.env.REACT_APP_API_DOMAIN}/api/round/${roundID}/match/${matchID}/next/loser`)
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getRoundNumber = (roundID: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/
round/${roundID}/roundNumber`)
  .then((response) => response.json())
  .then((data:RoundNumber) => ({
    roundNumber: data.roundNumber,
  }));

const getWinner = (matchID: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${matchID}/winner`)
  .then((response) => response.json())
  .then((data:WinnerName) => ({
    name: data.winner,
  }));

const getRoundRobinTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/
bracketMatchInfo`);
  const json = await response.json();
  return Promise.all(
    json.map(async (item: RoundRobinMatch) => {
      const roundNumber = await getRoundNumber(Number(item.tournamentRoundText));
      const winner = await getSeriesWinnerID(item.id);
      const players = await getParticipantInformation(item.id, winner);
      const winnerName = players[0].id === winner.next? players[0].name : players[1].name;
      return {
        id: item.id,
        round: roundNumber.roundNumber,
        match: item.id,
        tournamentRoundText: item.tournamentRoundText,
        startTime: item.startTime,
        endTime: item.endTime,
        participants: `${players[0].name}, ${players[1].name}`,
        winner: winnerName,
      };
    }),
  );
};

const getUpperBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/
bracketMatchInfo`);
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const winner = await getSeriesWinnerID(item.id);
      const players = await getParticipantInformation(item.id, winner);
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
  const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/
bracketMatchInfo`);
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const winner = await getSeriesWinnerID(item.id);
      const players = await getParticipantInformation(item.id, winner);
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
  ).then((matches:SingleBracketMatch[]) => matches.filter((match) => 
      ((match.nextMatchId != null && match.nextLooserMatchId == null))))
      .then((filtered:SingleBracketMatch[]) => filtered);
};

const getBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`,
  );
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText), item.id);
      const winner = await getSeriesWinnerID(item.id);
      const players = await getParticipantInformation(item.id, winner);
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

const getSeriesWinnerID = (matchID: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${matchID}/series/winner`)
    .then((response) => response.json())
    .then((data:NumberQuery) => ({
        next: data.next,
    }));

const BracketService = {
  getBracketTournamentMatchInfo,
  getUpperBracketTournamentMatchInfo,
  getLowerBracketTournamentMatchInfo,
  getParticipantInformation,
  getRoundRobinTournamentMatchInfo,
};

export default BracketService;


