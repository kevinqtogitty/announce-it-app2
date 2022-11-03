/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';
import { getAuth } from 'firebase/auth';
import {
  addUserToATeam,
  createANewTeam,
} from '../../server/axiosRequests/requests';

const CreateNewTeamForm = () => {
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [teamCodeToJoin, setTeamCodeToJoin] = useState<string>('');
  const [tab1Classname, setTab1ClassName] = useState<string>('is-active');
  const [tab2Classname, setTab2ClassName] = useState<string>('');

  const auth = getAuth();
  const { currentUser } = auth;
  const { uid } = currentUser!;

  const handleCreateNewTeam = async () => {
    try {
      await createANewTeam(uid, newTeamName);
      setNewTeamName('');
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleJoinATeam = async () => {
    try {
      await addUserToATeam(uid, teamCodeToJoin);
      setTeamCodeToJoin('');
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleTabFocus = (key: string) => {
    switch (key) {
      case 'create':
        setTab1ClassName('is-active');
        setTab2ClassName('');
        break;
      case 'join':
        setTab2ClassName('is-active');
        setTab1ClassName('');
        break;
      default:
        return;
    }
  };
  return (
    <TabsRoot defaultValue="tab1" orientation="vertical">
      <TabList aria-label="tabs example" className="">
        <TabTrigger
          value="tab1"
          className={tab1Classname}
          onClick={() => handleTabFocus('create')}
        >
          Create a team
        </TabTrigger>
        <TabTrigger
          value="tab2"
          className={tab2Classname}
          onClick={() => handleTabFocus('join')}
        >
          Join a team
        </TabTrigger>
      </TabList>
      <TabContent value="tab1">
        <Form onSubmit={(e) => e.preventDefault()}>
          <StyledInput
            placeholder="Freds Foot Rub Club?"
            onChange={(e) => setNewTeamName(e.target.value)}
            value={newTeamName}
          />
          <FormSubmitButton type="submit" onClick={handleCreateNewTeam}>
            Create Team
          </FormSubmitButton>
        </Form>
      </TabContent>
      <TabContent value="tab2">
        <Form onSubmit={(e) => e.preventDefault()}>
          <StyledInput
            placeholder="Team code"
            onChange={(e) => setTeamCodeToJoin(e.target.value)}
            value={teamCodeToJoin}
          />
          <FormSubmitButton type="submit" onClick={handleJoinATeam}>
            Join Team
          </FormSubmitButton>
        </Form>
      </TabContent>
    </TabsRoot>
  );
};

export default CreateNewTeamForm;

const TabsRoot = styled(Tabs.Root)`
  align-self: center;
  width: 15rem;
  row-gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(55, 55, 55);
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  border-radius: 0px 0px 10px 10px;
`;

const TabTrigger = styled(Tabs.Trigger)`
  background-color: rgb(55, 55, 55);
  cursor: pointer;
  color: white;
  border: none;
  padding: 0.5rem;
  border-bottom: 2px solid transparent;

  &.is-active {
    border-bottom: 2px solid rgb(228, 132, 0);
  }
`;

const TabList = styled(Tabs.List)`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
`;

const TabContent = styled(Tabs.Content)`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 0.7rem;
  padding: 0.5rem;
`;

const FormSubmitButton = styled.button`
  align-self: center;
  border: none;
  color: rgb(255, 255, 255);
  background-color: rgb(228, 132, 0);
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.3rem 0rem 0.3rem 0rem;
`;
const StyledInput = styled.input`
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  border-radius: 3px;
  border: none;

  &:focus {
    outline: none;
  }
`;
