export interface Match {
  results: String,
  attendance: String,
  matchID: number,
  startTime: Date,
  endTime: Date,
  roundID: number,
  name: String,
  location: String,
  description: String,
  matchStatus: number
}

export interface Participants {
  userID:number,
  name:string,
  email:string,
  results:number,
  attendance:string,
}

export interface MatchForAdmin extends Match{
  playerOneID:number,
  playerTwoID:number,
  participants: Participants[],
}

export const initMatch = {
  results: '',
  attendance: '',
  matchID: -1,
  startTime: new Date(),
  endTime: new Date(),
  roundID: 1,
  name: '',
  matchStatus: 0,
  location: '',
  description: ' ',
  playerOneID: 0,
  playerTwoID: 0,
  participants: [],
};

export const getMatchResult = (resultStatus:number) => {
  switch (resultStatus) {
    case 0:
      return 'Tie';
    case 1:
      return 'Win';
    case 2:
      return 'Loss';
    default:
      return 'Pending';
  }
};

export enum MatchStatus {
  GREAT,
  OK,
  BAD,
}

export enum MatchResultTypes {
  Tie,
  Win,
  Loss,
  Pending,
}

export const AttendanceType = ['TBD', 'No', 'Yes'];
