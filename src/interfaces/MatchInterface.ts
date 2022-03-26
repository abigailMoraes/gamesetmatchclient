export interface Match {
  results: String,
  attendance: String,
  matchID: number,
  startTime: Date,
  endTime: Date,
  duration: number,
  roundNumber: number,
  name: String,
  location: String,
  description: String,
}

export const initMatch = {
  results: '',
  attendance: '',
  matchID: -1,
  startTime: new Date(),
  endTime: new Date(),
  duration: -1,
  roundNumber: 1,
  name: '',
  location: '',
  description: '',
};
