import * as yup from 'yup';

const minDate = new Date();

minDate.setDate(minDate.getDate() - 1);
const maxCharactersReached = (numCharacters:number) => `Maximum of ${numCharacters} characters allowed.`;

export const validationSchemaCreate = yup.object({
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
  numberOfMatches: yup
    .number()
    .min(1, 'Must be greater than 0')
    .required('Number of matches is required'),
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

export const validationSchemaEdit = yup.object({
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
  numberOfMatches: yup
    .number()
    .min(1, 'Must be greater than 0')
    .required('Number of matches is required'),
  startDate: yup
    .date(),
  closeRegistrationDate: yup
    .date(),
});
