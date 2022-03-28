export interface Tournament {
  tournamentID: number,
  name: string,
  description: string,
  startDate: Date,
  location: string,
  maxParticipants: number,
  prize: string,
  format: number,
  matchBySkill: number,
  closeRegistrationDate: Date,
  matchDuration: number,
  series: number,
  status:number,
  adminHostsTournament:number,
  registered:boolean,
  currentRound:number,
}

export const SkillLevels = ['Beginner', 'Intermediate', 'Advanced'];
