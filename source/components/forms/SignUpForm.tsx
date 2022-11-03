/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/named
import { Auth, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createNewUser } from '../../firebase/accountServices';
import { storeNewUser } from '../../server/axiosRequests/requests';
import { useStore } from '../../store/authStore';
import {
  Form,
  Input,
  InputLabelWrapper,
  Label,
  SubmitButton,
} from './SignInForm';

const SignUpForm: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();
  const auth = getAuth();

  const handleUserSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) return;
    try {
      const newUser = await createNewUser(auth, email, password);
      // console.log(newUser.user.uid);
      const newUserToStore = {
        userId: newUser!.user.uid,
        dateCreated: new Date().toString(),
        personalDetails: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      };
      await storeNewUser(newUserToStore);
      console.log('Success');
      navigate('account');
      // typeOfAccount === 'team_member'
      //   ? navigate('team_member_account')
      //   : navigate('team_leader_account');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputLabelWrapper>
        <Label hidden htmlFor="first_name">
          First Name
        </Label>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Label hidden htmlFor="lase_name">
          Last Name
        </Label>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

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

        <Label hidden htmlFor="password_confirmation">
          Password Confirmation
        </Label>
        <Input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </InputLabelWrapper>
      <SubmitButton
        className="create_account"
        type="submit"
        onClick={handleUserSignUp}
      >
        Create account
      </SubmitButton>
    </Form>
  );
};

export default SignUpForm;
