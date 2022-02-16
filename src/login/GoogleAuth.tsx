import styled from "@emotion/styled";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import {loginDataAtom} from "../atoms/userAtom"

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

  const navigate = useNavigate();
  const [loginData, setLoginData] = useAtom(loginDataAtom);

  const handleFailure = (result: any) => {
    alert(result);
  };

  const handleLogin = async (googleData: any) => {
    // console.log("GoogleData", googleData)
    // // TODO: POST api to backend for verification
    // const res = await fetch('http://localhost:8080/api/googleTokenId', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     tokenId: googleData.tokenId,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });
    // const data = await res.json()
    // console.log("Data is", data, typeof(data))
    // if (data.googleId) {
    //   setLoginData(data);
    //   localStorage.setItem('loginData', JSON.stringify(data));
    //   console.log("Data is", data)

    // } else {
    //   console.log("handleLogin: Login is not successful...")
    // }
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <PageContainer>
      <SpaceContainer />
      <ContentContainer>
        <SubContentContainer
          className="border-r"
          style={{ borderColor: "#ACA9A9" }}
        >
          <img
            alt="logo"
            className="w-3/6"
            src={require("../image/logo.png")}
          />
        </SubContentContainer>
        <SubContentContainer>
          {loginData ? (
            <div>
              <h3> you logged in as {loginData.email}</h3>
              <button onClick={handleLogout}> Logout </button>
            </div>
          ) : (
            <div className="flex flex-col h-1/2 justify-around items-center">
              <BigText className="text-white"> Welcome back</BigText>
              <GoogleLogin
                clientId={
                  process.env.REACT_APP_GOOGLE_CLIENT_ID
                    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
                    : ""
                }
                render={(renderProps) => (
                  <CustomButton
                    className="flex items-center"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <GoogleLogo
                      className="mx-3"
                      alt="Googlelogo"
                      src={require("../image/googleLogo.png")}
                    />
                    <SmallText style={{ color: "#444242" }}>
                      Sign in with Google{" "}
                    </SmallText>
                  </CustomButton>
                )}
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
              <MediumText className="text-white">
                {" "}
                New to GameSetMatch?{" "}
              </MediumText>
              <CustomButton>
                <SmallText style={{ color: "#444242" }}>
                  {" "}
                  Create a new account{" "}
                </SmallText>
              </CustomButton>
            </div>
          )}
        </SubContentContainer>
      </ContentContainer>
      <SpaceContainer className="flex items-center justify-center">
        <SmallText className="text-white"> Zoomers 2022 </SmallText>
      </SpaceContainer>
    </PageContainer>
  );
}

export default GoogleAuth;
