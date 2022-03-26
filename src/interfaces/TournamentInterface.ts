export interface Tournament {
  tournamentID: number,
  name: string,
  description: string,
  startDate: Date,
  location: string,
  maxParticipants: number,
  prize: string,
  format: number,
  type: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  numberOfMatches: number,
  roundDuration: number,
  status:number,
  adminHostsTournament:number,
  registered:boolean,
  currentRound:number,
}

export const SkillLevels = ['Beginner', 'Intermediate', 'Advanced'];
