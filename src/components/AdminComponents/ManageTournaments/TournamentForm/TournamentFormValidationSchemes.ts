import * as yup from 'yup';
import { TournamentStatus } from '../ManageTournamentsEnums';

const maxCharactersReached = (numCharacters:number) => `Maximum of ${numCharacters} characters allowed.`;

const startDateMinDaysAfterRegistration = 1;

const create = () => {
  const minStartDate = new Date();
  const minCloseRegistrationDate = new Date();
  minStartDate.setDate(minStartDate.getDate() + startDateMinDaysAfterRegistration);
  minCloseRegistrationDate.setDate(minCloseRegistrationDate.getDate() - 1);
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
      .min(minStartDate),
    closeRegistrationDate: yup
      .date()
      .min(
        minCloseRegistrationDate,
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
