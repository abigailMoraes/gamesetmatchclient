import * as yup from 'yup';
import { TournamentStatus } from '../ManageTournamentsEnums';

const maxCharactersReached = (numCharacters:number) => `Maximum of ${numCharacters} characters allowed.`;

const startDateMinDaysAfterRegistration = 2;

const create = () => {
  const minDate = new Date();

  // min date has to be at least today
  minDate.setDate(minDate.getDate() - 1);
  return yup.object({
    name: yup
      .string()
      .required('Name is required')
      .max(128, maxCharactersReached(128)),
    description: yup
      .string()
      .max(150, maxCharactersReached(150)),
    location: yup
      .string()
      .max(60, maxCharactersReached(60)),
    prize: yup
      .string()
      .max(60, maxCharactersReached(60)),
    matchDuration: yup
      .number()
      .min(1, 'Must be greater than 0')
      .required('Match Duration is required'),
    startDate: yup
      .date()
      .min(new Date()),
    closeRegistrationDate: yup
      .date()
      .min(
        minDate,
        'Registration close date cannot be in the past',
      ),
  });
};

// const editOpenForRegistration = yup.object({
//   name: yup
//     .string()
//     .required('Name is required')
//     .max(128, maxCharactersReached(128)),
//   description: yup
//     .string()
//     .max(150, maxCharactersReached(150)),
//   location: yup
//     .string()
//     .max(60, maxCharactersReached(60)),
//   prize: yup
//     .string()
//     .max(60, maxCharactersReached(60)),
//   matchDuration: yup
//     .number()
//     .min(1, 'Must be greater than 0')
//     .required('Match Duration is required'),
//   startDate: yup
//     .date(),
//   closeRegistrationDate: yup
//     .date(),
// });

const editInProgress = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(128, maxCharactersReached(128)),
  description: yup
    .string()
    .max(150, maxCharactersReached(150)),
  location: yup
    .string()
    .max(60, maxCharactersReached(60)),
  prize: yup
    .string()
    .max(60, maxCharactersReached(60)),
  matchDuration: yup
    .number()
    .min(1, 'Must be greater than 0')
    .required('Match Duration is required'),
});

const getEditScheme = (status:number) => {
  switch (status) {
    case TournamentStatus.OpenForRegistration:
      return create();
    default:
      return editInProgress;
  }
};

const ValidationSchemes = {
  create,
  getEditScheme,
  startDateMinDaysAfterRegistration,
};

export default ValidationSchemes;
