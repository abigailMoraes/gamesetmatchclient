/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Field, Form, Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useAtomValue } from 'jotai';
import { loginDataAtom } from '../atoms/userAtom';
import { PageContainer, SpaceContainer } from './FirebaseAuth';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

const ContentContainer = styled.div`
  display: flex;
  flex：direction: row;
  justify-content: center;
  flex: 6;
`;

const FormContainer = styled.div`
  height: 100%;
  width: 35%;
  display: flex;
  flex-direction: column;
`;

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

const RegistrationTitle = styled.h1`
    font-size: x-large;
    color: white;
`;

interface Values {
  code: string;
  email: string;
}

function Registration() {
  const navigate = useNavigate();
  const [isSubmit, setDisplay] = useState(false);
  const [message, setDisplayMessage] = useState(<div />);
  const userData = useAtomValue(loginDataAtom);
  const ErrorMessage = <Alert severity="error"> Invalid code or code has expired.</Alert>;
  const RegisteredMessage = <Alert onClose={() => { navigate('/'); }}> You are now registered! Please log in again. </Alert>;

  return (
    <PageContainer>
      <SpaceContainer className="">
        <img
          alt="logo"
          className="w-1/5 m-6"
          // eslint-disable-next-line global-require
          src={require('../image/logoHorizontal.png')}
        />
      </SpaceContainer>
      <ContentContainer>
        <FormContainer className="">
          <RegistrationTitle> Please type in a valid invitation code </RegistrationTitle>
          <Formik
            initialValues={{
              code: '',
              email: userData.email,
            }}
            onSubmit={(
              values: Values,
            ) => {
              fetch(`${baseURL}/validateInviteCode/${values.code}/${values.email}`, {
                method: 'Get',
                headers: { 'Content-Type': 'application/json' },
              }).then((response) => response.json()).then((boo) => {
                if (boo === true) {
                  setDisplayMessage(RegisteredMessage);
                } else {
                  setDisplayMessage(ErrorMessage);
                  setDisplay(true);
                }
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
                ? message : <div /> }
            </CustomForm>
          </Formik>
        </FormContainer>
      </ContentContainer>
      <SpaceContainer />
    </PageContainer>
  );
}

export default Registration;
