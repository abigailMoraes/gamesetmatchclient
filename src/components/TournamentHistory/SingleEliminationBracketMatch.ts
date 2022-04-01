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
const getParticipantInformation = (matchID: number) => fetch(`http://localhost:8080/api/tournament/
${matchID}/userMatchInfo`)
  .then((response) => response.json()).then((data) => data.map((item:Participant) => ({
    id: item.id,
    isWinner: item.resultText === 'Win',
    name: item.name,
    status: item.status,
    resultText: item.resultText,
  })));

const getNextMatchIDSingleElimination = (roundID:number, matchID:number) => fetch(`
http://localhost:8080/api/tournament/round/${roundID}/match/${matchID}`)
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getNextWinnerMatchID = (roundID: number, matchID: number)=> fetch(`
http://localhost:8080/api/round/${roundID}/match/${matchID}/next/winner`)
    .then((response) => response.json())
    .then((data:NumberQuery) => ({
        next: data.next,
    }));


const getNextLoserMatchID = (roundID: number, matchID: number)=> fetch(`
http://localhost:8080/api/round/${roundID}/match/${matchID}/next/loser`)
    .then((response) => response.json())
    .then((data:NumberQuery) => ({
        next: data.next,
    }));


const getRoundNumber = (roundID: number) => fetch(`http://localhost:8080/api/round/${roundID}/roundNumber`)
    .then((response)=>response.json())
    .then((data:RoundNumber)=>({
        roundNumber:data.roundNumber,
    }));

const getWinner = (matchID: number) => fetch(`http://localhost:8080/api/match/${matchID}/winner`)
    .then((response)=>response.json())
    .then((data:WinnerName)=>({
        name:data.winner,
    }));

const getRoundRobinTournamentMatchInfo = async (tournamentID: number | undefined) => {
    const response = await fetch(`http://localhost:8080/api/tournament/${tournamentID}/bracketMatchInfo`);
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
            participants: [players[0].name,players[1].name],
            winner: winner.name,
            };
    }),
    );
};

const getUpperBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await fetch(`http://localhost:8080/api/tournament/${tournamentID}/bracketMatchInfo`);
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
        const players = await getParticipantInformation(item.id);
        const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText), item.id);
        const nextLoserMatch = await getNextLoserMatchID(Number(item.tournamentRoundText), item.id)
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
  ).then((matches:SingleBracketMatch[])=> matches.filter((match)=>
      ((match.nextMatchId == null && match.nextLooserMatchId == null)||(match.nextMatchId!=null
          && match.nextLooserMatchId != null)))).then((filtered:SingleBracketMatch[])=> filtered);
};

const getLowerBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
    const response = await fetch(`http://localhost:8080/api/tournament/${tournamentID}/bracketMatchInfo`);
    const json = await response.json();
    return Promise.all(
        json.map(async (item: SingleBracketMatch) => {
            const players = await getParticipantInformation(item.id);
            const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText),item.id);
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
    ).then((matches:SingleBracketMatch[])=> matches.filter((match)=>
        ((match.nextMatchId != null && match.nextLooserMatchId == null)))).then((filtered:SingleBracketMatch[])=>
        filtered);
};


const getBracketTournamentMatchInfo = async (tournamentID: number | undefined) => {
    const response = await fetch(
        `http://localhost:8080/api/tournament/${tournamentID}/bracketMatchInfo`);
    const json = await response.json();
    return Promise.all(
        json.map(async (item: SingleBracketMatch) => {
            const players = await getParticipantInformation(item.id);
            const nextMatch = await getNextWinnerMatchID(Number(item.tournamentRoundText),item.id);
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
  getBracketTournamentMatchInfo, getUpperBracketTournamentMatchInfo, getLowerBracketTournamentMatchInfo,
    getParticipantInformation, getRoundRobinTournamentMatchInfo,
};

export default BracketService;


