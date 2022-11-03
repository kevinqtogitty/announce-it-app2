// eslint-disable-next-line import/named
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ComposedSignInSignUpForm from "../components/forms/ComposedSignInSignUpForm";
import { Props } from "../utils/privateRoutes";

const Home: React.FC<Props> = ({ auth }): JSX.Element => {
  const navigate = useNavigate();
  if (auth.currentUser) {
    navigate("/about");
    return <></>
  } else {
    return (
      <SignInUndrawWrapper>
        <UndrawImage src="/community.svg" />
        <ComposedSignInSignUpForm />
      </SignInUndrawWrapper>
    );
  }
};

export default Home;

const UndrawImage = styled.img`
  width: 30rem;
`;

const SignInUndrawWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  position: absolute;
  top: calc(50% - 15rem);
  left: calc(50% - 35rem);
  width: 70rem;
  justify-content: space-between;
`;
