import {
  Button,
  CircularProgress,
  DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { Tournament } from '../../BrowseTournaments/TournamentsService';
import StyledButton from '../../General/StyledButton';
import StyledDatePicker from '../../General/StyledDatePicker';
import StyledInputField from '../../General/StyledInputField';
import StyledSelect from '../../General/StyledSelect';
import ManageTournamentService from './ManageTournamentService';
import StatusModal from '../../General/StatusModal';

interface TournamentFormProps {
  open:boolean,
  // eslint-disable-next-line react/require-default-props
  tournament?: Tournament,
  setOpen: (arg0: boolean) => void;
}

const initialState = {
  name: '',
  description: '',
  startDate: new Date(),
  location: '',
  prize: '',
  format: 0,
  type: 0,
  closeRegistrationDate: new Date(),
  matchDuration: 1,
  numberOfMatches: 0,
  adminHostsTournament: 0,
};

const startDateMinDaysAfterRegistration = 1;
const startDateErrorMessage = `Start date must be ${startDateMinDaysAfterRegistration} day after registration period closes`;
const maxCharactersReached = (numCharacters:number) => `Maximum of ${numCharacters} characters allowed.`;

const isStartDateAfterRegistration = (startDate:Date | null, registration:Date):boolean => {
  if (!startDate) {
    return true;
  }
  const startDateMoment = moment(startDate);
  const registrationDateMoment = moment(registration);
  const duration = moment.duration(startDateMoment.diff(registrationDateMoment));
  return duration.asDays() >= startDateMinDaysAfterRegistration;
};

function TournamentForm({ open, setOpen, tournament = undefined }: TournamentFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [responseOpen, setResponseOpen] = React.useState(false);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  const validationSchema = yup.object({
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

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      if (tournament) {
        ManageTournamentService.updateTournament(1, values).then(() => {
          setLoading(false);
          setResponseOpen(true);
        })
          .catch(() => {
            setLoading(false);
            setError(true);
            setResponseOpen(true);
          });
      } else {
        const request = values;
        // TODO get value from atom
        request.adminHostsTournament = 0;
        ManageTournamentService.createTournament(values).then(() => {
          setLoading(false);
          setResponseOpen(true);
        })
          .catch(() => {
            setLoading(false);
            setError(true);
            setResponseOpen(true);
          });
      }
    },
  });

  const handleClose = () => {
    setOpen(!open);
    formik.resetForm();
  };

  const handleSuccessDialogClose = () => {
    setResponseOpen(false);
    handleClose();
  };

  const handleErrorDialogClose = () => {
    setResponseOpen(false);
  };

  return (
    <Dialog
      open={open}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {`${tournament ? 'Edit' : 'Create'} your tournament`}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1.5} my={0.5}>
            <StyledInputField
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              required
            />
            <StyledInputField
              id="description"
              label="Tournament Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.description)}
              helperText={formik.errors.description}
            />
            <StyledInputField
              id="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.location)}
              helperText={formik.errors.location}
            />
            <StyledInputField
              id="prize"
              label="Prize"
              value={formik.values.prize}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.prize)}
              helperText={formik.errors.prize}
            />
            <StyledInputField
              id="matchDuration"
              label="Match Duration"
              value={formik.values.matchDuration}
              onChange={formik.handleChange}
              width={6}
              type="number"
              required
              error={formik.touched.matchDuration && Boolean(formik.errors.matchDuration)}
              helperText={formik.touched.matchDuration ? formik.errors.matchDuration : ''}
              endAdornment="minutes"
            />
            <StyledInputField
              id="numberOfMatches"
              label="Best of"
              value={formik.values.numberOfMatches}
              onChange={formik.handleChange}
              width={6}
              type="number"
              error={formik.touched.numberOfMatches && Boolean(formik.errors.numberOfMatches)}
              helperText={formik.touched.numberOfMatches ? formik.errors.numberOfMatches : ''}
              required
            />
            <StyledSelect
              id="format"
              label="Format"
              selectOptions={[{ value: 0, text: 'Single-elimination' }, { value: 2, text: 'Double-Elimination' }, { value: 1, text: 'Round-Robin' }]}
              value={formik.values.format}
              onChange={formik.handleChange}
              width={6}
            />
            <StyledSelect
              id="type"
              label="Match participants"
              selectOptions={[{ value: 0, text: 'Randomly' }, { value: 1, text: 'By Skill' }]}
              value={formik.values.type}
              onChange={formik.handleChange}
              width={6}
            />
            <StyledDatePicker
              label="Close Registration Date"
              value={formik.values.closeRegistrationDate}
              onChange={(newValue) => {
                formik.setFieldTouched('closeRegistrationDate');
                formik.setFieldValue(
                  'closeRegistrationDate',
                  newValue,
                );
              }}
              error={formik.touched.closeRegistrationDate && Boolean(formik.errors.closeRegistrationDate)}
              helperText={
                  (formik.touched.closeRegistrationDate && formik.errors.closeRegistrationDate)
                    ? 'Registration close date cannot be in the past' : ''
                }
            />
            <StyledDatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(newValue) => {
                formik.setFieldTouched('startDate');
                formik.setFieldValue(
                  'startDate',
                  newValue,
                );
                if (!isStartDateAfterRegistration(newValue, formik.values.closeRegistrationDate)) {
                  formik.setFieldError('startDate', startDateErrorMessage);
                }
              }}
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={
                (formik.touched.startDate && formik.errors.startDate)
                  ? startDateErrorMessage : ''
                }
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <StyledButton buttonText="Cancel" handleClick={handleClose} />
          <Button type="submit" size="small" color="secondary">{`${tournament ? 'Save' : 'Add'}`}</Button>
        </DialogActions>
      </form>
      {loading && <CircularProgress />}
      {error ? (
        <StatusModal
          open={responseOpen}
          handleDialogClose={handleErrorDialogClose}
          dialogText="There was an error with creating the tournament, please try again later or contact your administrator."
          dialogTitle="Error"
          isError={error}
        />
      ) : (
        <StatusModal
          open={responseOpen}
          handleDialogClose={handleSuccessDialogClose}
          dialogText="You have successfully created a new tournament. It is now open for registration.
          After registration closes, a tournament schedule will be proposed for you to verify."
          dialogTitle="Success!"
          isError={error}
        />
      )}
    </Dialog>
  );
}

export default TournamentForm;
