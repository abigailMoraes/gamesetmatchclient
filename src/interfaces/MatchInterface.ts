export interface Match {
  results: String,
  attendance: String,
  matchID: number,
  startTime: Date,
  endTime: Date,
  duration: number,
  type: String,
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
  type: '',
  name: '',
  location: '',
  description: '',
};
