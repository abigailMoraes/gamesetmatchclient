import { Tournament } from '../../../interfaces/TournamentInterface';

export enum TabNames {
  OpenForRegistration,
  ManageSchedule,
  Ongoing,
  Over,
}

export enum GridCardTypes {
  ManageSchedule,
  Ongoing,
  OpenForRegistration,
}

export enum TournamentStatus {
  OpenForRegistration,
  RegistrationClosed,
  ReadyToPublishSchedule,
  Ongoing,
  ReadyToPublishNextRound,
  FinalRound,
  TournamentOver,
}

export const FormatType = ['Single-elimination', 'Double-Elimination', 'Round-Robin'];

export const MatchingType = ['Randomly', 'By Skill'];

export const SeriesType = ['Best of 1', 'Best of 3', 'Best of 5', 'Best of 7'];

export interface TournamentRow {
  id: Number,
  name: String,
  description: String,
  location: String,
  startDate: Date,
  closeRegistrationDate: Date,
  allTournamentDetails: Tournament
}
