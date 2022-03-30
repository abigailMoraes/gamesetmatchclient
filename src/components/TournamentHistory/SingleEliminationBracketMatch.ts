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

export interface NumberQuery{
  next: number | null;
}

const getParticipantInformation = (matchID: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/
${matchID}/userMatchInfo`)
  .then((response) => response.json()).then((data) => data.map((item:Participant) => ({
    id: item.id,
    isWinner: item.resultText === 'Win',
    name: item.name,
    status: item.status,
    resultText: item.resultText,
  })));

const getNextMatchIDSingleElimination = (roundID:number, matchID:number) => fetch(`
${process.env.REACT_APP_API_DOMAIN}/api/tournament/round/${roundID}/match/${matchID}`)
  .then((response) => response.json())
  .then((data:NumberQuery) => ({
    next: data.next,
  }));

const getTournamentMatchInfo = async (tournamentID: number | undefined) => {
  const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/tournament/${tournamentID}/bracketMatchInfo`);
  const json = await response.json();
  return Promise.all(
    json.map(async (item: SingleBracketMatch) => {
      const players = await getParticipantInformation(item.id);
      const nextMatch = await getNextMatchIDSingleElimination(Number(item.tournamentRoundText), item.id);
      return {
        id: item.id,
        name: item.name,
        nextMatchId: nextMatch.next,
        tournamentRoundText: item.tournamentRoundText,
        startTime: item.startTime,
        state: 'SCHEDULED',
        participants: players,
      };
    }),
  );
};

const BracketService = {
  getTournamentMatchInfo, getParticipantInformation,
};

export default BracketService;
