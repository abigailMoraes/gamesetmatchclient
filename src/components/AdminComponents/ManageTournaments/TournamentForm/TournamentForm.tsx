/* eslint-disable react/require-default-props */
import {
  Button,
  CircularProgress,
  DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useAtomValue } from 'jotai';
import { Tournament } from '../../../BrowseTournaments/TournamentsService';
import StyledButton from '../../../General/StyledButton';
import StyledDatePicker from '../../../General/StyledDatePicker';
import StyledInputField from '../../../General/StyledInputField';
import StyledSelect from '../../../General/StyledSelect';
import ManageTournamentService from '../ManageTournamentService';
import StatusModal from '../../../General/StatusModal';
import { userIDAtom } from '../../../../atoms/userAtom';
import { validationSchemaCreate, validationSchemaEdit } from './TournamentFormValidationSchemes';
import {
  FormatType, MatchingType, SeriesType, TabNames,
} from '../ManageTournamentsEnums';

interface TournamentFormProps {
  open:boolean,
  tournament?: Tournament,
  setTournament?: (arg0:Tournament) => void,
  setOpen: (arg0: boolean) => void,
  updateGrid?:(arg0:boolean) => void,
  currentTab?:number
}
// TODO disable and enable fields based on tournament status
const tournamentTemplate = {
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

const isStartDateAfterRegistration = (startDate:Date | null, registration:Date):boolean => {
  if (!startDate) {
    return true;
  }
  const startDateMoment = moment(startDate);
  const registrationDateMoment = moment(registration);
  const duration = moment.duration(startDateMoment.diff(registrationDateMoment));
  return duration.asDays() >= startDateMinDaysAfterRegistration;
};

function TournamentForm({
  open, setOpen, tournament = undefined, setTournament, updateGrid, currentTab,
}: TournamentFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [responseOpen, setResponseOpen] = React.useState(false);
  const [formValidation, setFormValidation] = React.useState(tournament ? validationSchemaEdit : validationSchemaCreate);
  const userID = useAtomValue(userIDAtom);
  const formik = useFormik({
    initialValues: tournament || tournamentTemplate,
    validationSchema: formValidation,
    onSubmit: (values) => {
      setLoading(true);
      if (tournament) {
        ManageTournamentService.updateTournament(tournament.tournamentID, values).then(() => {
          setLoading(false);
          if (setTournament) {
            const updatedTournament = { ...tournament };
            updatedTournament.name = values.name;
            updatedTournament.description = values.description;
            updatedTournament.startDate = values.startDate;
            updatedTournament.location = values.location;
            updatedTournament.prize = values.prize;
            updatedTournament.format = values.format;
            updatedTournament.type = values.type;
            updatedTournament.closeRegistrationDate = values.closeRegistrationDate;
            updatedTournament.matchDuration = values.matchDuration;
            updatedTournament.numberOfMatches = values.numberOfMatches;

            setTournament(updatedTournament);
          }

          setResponseOpen(true);
        })
          .catch(() => {
            setLoading(false);
            setError(true);
            setResponseOpen(true);
          });
      } else {
        const request = values;
        request.adminHostsTournament = userID;
        ManageTournamentService.createTournament(request).then(() => {
          setLoading(false);
          setResponseOpen(true);
          if (updateGrid && tournament === undefined) {
            updateGrid(currentTab === TabNames.OpenForRegistration);
          }
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
    formik.resetForm();
    setOpen(!open);
  };

  const handleSuccessDialogClose = () => {
    setResponseOpen(false);
    if (updateGrid && currentTab && tournament === undefined) {
      updateGrid(currentTab === 0);
    }
    handleClose();
  };

  const handleErrorDialogClose = () => {
    setResponseOpen(false);
  };

  React.useEffect(() => {
    formik.setErrors({});
    formik.setValues(tournament ? { ...tournament } : { ...tournamentTemplate });
    setFormValidation(tournament ? validationSchemaEdit : validationSchemaCreate);
  }, [tournament]);

  return (
    <Dialog
      open={open}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {`${tournament ? 'Edit' : 'Create'} your tournament`}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1.5} my={0.5} display="flex">
            <StyledInputField
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name ? formik.errors.name : ''}
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
            <StyledSelect
              id="numberOfMatches"
              label="Series Type"
              selectOptions={SeriesType.map((text, index) => ({ value: index, text }))}
              value={formik.values.numberOfMatches}
              onChange={formik.handleChange('numberOfMatches')}
              width={6}
            />
            <StyledSelect
              id="format"
              label="Format"
              selectOptions={FormatType.map((text, index) => ({ value: index, text }))}
              value={formik.values.format}
              onChange={formik.handleChange('format')}
              width={6}
            />
            <StyledSelect
              id="type"
              label="Match participants"
              selectOptions={MatchingType.map((text, index) => ({ value: index, text }))}
              value={formik.values.type}
              onChange={formik.handleChange('type')}
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
          dialogText={`There was an error with ${tournament ? 'updating' : 'creating'} 
          the tournament, please try again later or contact your administrator.`}
          dialogTitle="Error"
          isError={error}
        />
      ) : (
        <StatusModal
          open={responseOpen}
          handleDialogClose={handleSuccessDialogClose}
          dialogText={tournament ? 'Update was successful' : `You have successfully created a new tournament. 
          It is now open for registration. After registration closes, a tournament schedule will be proposed for you to verify.`}
          dialogTitle="Success!"
          isError={error}
        />
      )}
    </Dialog>
  );
}

export default TournamentForm;
