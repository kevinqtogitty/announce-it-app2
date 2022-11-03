import * as Accordion from "@radix-ui/react-accordion";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styled, { keyframes } from "styled-components";
import { getAllTeamsUserIsALeaderOf } from "../server/axiosRequests/requests";
import { TeamProps } from "../server/mongoDB/schemas";
import { useTeamStore } from "../store/teamsStore";
import { useCurrentUserStore } from "../store/userStore";
import AccordionForLeaderOf from "./accordions/AccordionForLeaderOf";
import AccordionForMemberOf from "./accordions/AccordionForMemberOf";

const UsersTeamInfo = () => {
  const [teamsUserCreated, setTeamsUserCreated] = useState<TeamProps[]>([]);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const removeUserFromTeam = useTeamStore(
    (state) => state.removeTeamUserIsAMemberOf
  );
  const teamsUserIsAPartOf = useTeamStore(
    (state) => state.teamsUserIsAMemberOf
  );
  const teamsUserIsALeaderOF = useTeamStore(
    (state) => state.teamsUserIsALeaderOf
  );

  useEffect(() => {
    const handleTeamFetching = async () => {
      const teams = await getAllTeamsUserIsALeaderOf(currentUser.userId);
      setTeamsUserCreated(teams);
    };
    handleTeamFetching();
  }, []);

  return (
    <TeamsInfoMainWrapper>
      <h3>Your teams</h3>
      <AccordionForLeaderOf
        setTeamsUserCreated={setTeamsUserCreated}
        teamsUserCreated={teamsUserCreated}
        currentUser={currentUser}
      />
      <h3>Teams you&apos;re in</h3>
      <AccordionForMemberOf
        teamsUserIsAPartOf={teamsUserIsAPartOf}
        currentUser={currentUser}
        removeUserFromTeam={removeUserFromTeam}
      />
    </TeamsInfoMainWrapper>
  );
};

export default UsersTeamInfo;

const TeamsInfoMainWrapper = styled.section`
  min-height: 20rem;
  border: 0.5px solid grey;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  color: white;
  border-radius: 3px;
  grid-row: span 2;
  min-width: 15rem;
`;

export const AccordionContainer = styled.div`
  overflow: scroll;
  max-height: 18rem;
  border-radius: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AccordionRoot = styled(Accordion.Root)`
  min-width: 20rem;
  border: 0.5px solid grey;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
`;

export const AccordionItem = styled(Accordion.Item)``;

export const AccordionHeader = styled(Accordion.Header)`
  margin: 0;
  padding: 0.5rem;
  display: flex;
  column-gap: 1rem;
  justify-content: space-between;
`;

export const AccordionTrigger = styled(Accordion.Trigger)`
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: none;
  cursor: pointer;
`;

export const AccordionContent = styled(Accordion.Content)`
  padding: 0.5rem;
  background-color: rgb(220, 220, 220);
`;

export const ContenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const StyledChevron = styled(ChevronDownIcon)`
  color: black;
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  & [data-state="open"] {
    transform: rotate(180deg);
  }
`;

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});
