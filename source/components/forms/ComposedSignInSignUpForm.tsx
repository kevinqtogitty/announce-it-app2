import React, { useState } from "react";
import styled from "styled-components";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const ComposedSignInSignUpForm: React.FC = (): JSX.Element => {
  const [switchForm, setSwitchForm] = useState(false);
  const toggleForms = () => setSwitchForm((state) => !state);
  return (
    <FormWrapper>
      {switchForm ? <SignUpForm /> : <SignInForm />}
      {switchForm ? (
        <Span onClick={toggleForms}>Already have an account?</Span>
      ) : (
        <Span onClick={toggleForms}>Sign up</Span>
      )}
    </FormWrapper>
  );
};

export default ComposedSignInSignUpForm;

const Span = styled.span`
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  color: rgb(255, 255, 255);
`;

const FormWrapper = styled.div`
  padding-bottom: -8rem;
  border: 0.5px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  background-color: rgb(30, 30, 30);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  height: 25rem;
  width: 22rem;
  /* top: calc(50% - 12.5rem); */
  /* right: 5rem; */
`;
