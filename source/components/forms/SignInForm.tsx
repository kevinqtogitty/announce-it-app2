// eslint-disable-next-line import/named
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInUser } from "../../firebase/accountServices";
import ErrorNotification from "../ErrorNotification";

const SignInForm: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorShowing, setErrorShowing] = useState<boolean>(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      await signInUser(auth, email, password, setErrorShowing);
      if (auth.currentUser) {
        navigate("newsfeed");
      }
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      {errorShowing ? <ErrorNotification /> : null}
      <InputLabelWrapper>
        <Label hidden htmlFor="email">
          Email
        </Label>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label hidden htmlFor="password">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputLabelWrapper>
      <SubmitButton onClick={handleSignIn}>Login</SubmitButton>
    </Form>
  );
};

export default SignInForm;

export const Form = styled.form`
  /* border: 2px solid purple; */
  width: 20rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  align-items: center;
`;

export const InputLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: fit-content;
  align-items: center;
  /* border: 2px solid blue; */
  justify-content: center;
`;

export const Label = styled.label`
  font-size: 1.4rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  height: 1rem;
  width: 12rem;
  background-color: rgb(55, 55, 55);
  color: white;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: white;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  border: none;
  border-radius: 3px;
  background-color: rgb(228, 132, 0);
  color: rgb(255, 255, 255);
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  width: 6.5rem;
  border: none;
  cursor: pointer;

  &.create_account {
    width: 7.5rem;
  }
`;
