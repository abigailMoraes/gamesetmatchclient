/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { loginDataAtom } from '../atoms/userAtom';
import 'firebase/compat/auth';

const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
firebase.initializeApp(config);

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #252525;
`;

export const SpaceContainer = styled.div`
  flex: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex：direction: row;
  flex: 6;
`;

const SubContentContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-right-width： 10px;
`;

export const BigText = styled.h1`
  font-size: 3rem;
`;

const MediumText = styled.h1`
  font-size: 1.5rem;
`;

const SmallText = styled.h1`  
  font-size: 0.95rem;
`;

const CustomButton = styled.button`
  width: 70%;
  height: 42px;
  background: #e5e5e5;
  border-radius: 8px;
`;

const GoogleLogo = styled.img`
  max-height: 70%;
  max-width: 70%;
`;

function GoogleAuth() {
  const [loginData, setLoginData] = useAtom(loginDataAtom);

  // Configure FirebaseUI.
  const uiConfig = {
  // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult(authResult : any, redirectUrl: any) {
      // Note: the JWT Token returned from authResult has a different aud, use the one returned by getIdToken()
        firebase.auth().currentUser?.getIdToken()
          .then((idToken) => fetch(`${baseURL}/verifyIdToken`, {
            method: 'POST',
            body: idToken,
          }))
          .then((res) => res.json())
          .then((data) => {
            setLoginData(data);
          })
          .catch((err) => console.log(err));
        return true;
      },
      signInFailure(error: any) {
        alert(error);
      },
    },
  };

  return (
    <PageContainer>
      <SpaceContainer />
      <ContentContainer>
        <SubContentContainer
          className="border-r"
          style={{ borderColor: '#ACA9A9' }}
        >
          <img
            alt="logo"
            className="w-3/6"
            // eslint-disable-next-line global-require
            src={require('../image/Logo.png')}
          />
        </SubContentContainer>
        <SubContentContainer>
          <div className="flex flex-col h-1/2 justify-around items-center">
            <BigText className="text-white"> Welcome back</BigText>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </SubContentContainer>
      </ContentContainer>
      <SpaceContainer className="flex items-center justify-center">
        <SmallText className="text-white"> Zoomers 2022 </SmallText>
      </SpaceContainer>
    </PageContainer>
  );
}

export default GoogleAuth;
