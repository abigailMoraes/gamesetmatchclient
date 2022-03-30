/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Field, Form, Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { loginDataAtom } from '../atoms/userAtom';
import LogoLoginPage from '../components/Logo/LogoLoginPage';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #252525;
`;

// const SpaceContainer = styled.div`
//   flex: 1;
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   flex：direction: row;
//   justify-content: center;
//   flex: 6;
// `;

// const FormContainer = styled.div`
//   height: 100%;
//   width: 35%;
//   display: flex;
//   flex-direction: column;
// `;

const CustomForm = styled(Form)`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-evenly;
`;

const CustomField = styled(Field)`
  border-radius: 8px;
  background-color: #e5e5e5;
  width: 100%;
  height: 30px;
  min-width: 200px;
  max-width: 400px;
  text-align: center;
  align-self: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled.button`
  border-radius: 10px;
  background-color: #e5e5e5;
  width: 180px;
  height: 50px;
  align-self: center;
`;

interface Values {
  code: string;
}

function Registration() {
  const navigate = useNavigate();
  const [isSubmit, setDisplay] = useState(false);
  const [alert, setDisplayMessage] = useState(<div />);
  const userData = useAtomValue(loginDataAtom);
  let message : string = '';

  return (
    <PageContainer>
      <Box sx={{
        maxWidth: '50%', maxHeight: '25%', alignSelf: 'center', paddingTop: 2,
      }}
      >
        <LogoLoginPage width="100" height="87.5" />
      </Box>
      <Typography variant="h4" sx={{ paddingTop: 6, alignSelf: 'center' }}>Please type in a valid invitation code</Typography>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={(
          values: Values,
        ) => {
          fetch(`${baseURL}/validateInviteCode/${values.code}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          }).then((response) => {
            response.text().then((str) => {
              message = str;
            }).then(() => {
              if (response.status === 200) {
                setDisplayMessage(
                  <Alert onClose={() => { navigate('/dashboard'); }} sx={{ maxWidth: '30%', alignSelf: 'center' }}>
                    {message}
                    &nbsp; Close message to be redirected to dashboard.
                  </Alert>,
                );
              } else {
                setDisplayMessage(
                  <Alert severity="error" sx={{ maxWidth: '30%', alignSelf: 'center' }}>
                    {message}
                  </Alert>,
                );
              }
              setDisplay(true);
            });
          });
        }}
      >
        <CustomForm className="">
          <ColumnContainer className="flex items-start">
            <CustomField
              id="code"
              name="code"
            />
          </ColumnContainer>
          <ConfirmButton className="mt-4" type="submit">Confirm</ConfirmButton>
          {isSubmit
            ? alert : <div /> }
        </CustomForm>
      </Formik>
    </PageContainer>
  );
}

export default Registration;
