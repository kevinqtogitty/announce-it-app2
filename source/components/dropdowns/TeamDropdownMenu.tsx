import React from "react";
import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import { LeaderAndMemberOfProps } from "../../server/mongoDB/schemas";

interface DropDownProps {
  teamsUserIsALeaderOf: LeaderAndMemberOfProps[];
  setSelectTeamToSubmit: React.Dispatch<React.SetStateAction<string>>;
}

const TeamDropdownMenu: React.FC<DropDownProps> = ({
  teamsUserIsALeaderOf,
  setSelectTeamToSubmit,
}) => {
  return (
    <Box>
      <Select.Root defaultValue="" onValueChange={setSelectTeamToSubmit}>
        <SelectTrigger>
          <Select.Value placeholder="Team to post to" />
          <Select.Icon />
        </SelectTrigger>
        <Select.Content>
          <SelectViewport>
            <SelectItem value={""}>
              <Select.ItemText>Post to?</Select.ItemText>
            </SelectItem>
            {teamsUserIsALeaderOf.map((team, id) => (
              <SelectItem key={id} value={team.teamId}>
                <Select.ItemText>{team.teamName}</Select.ItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default TeamDropdownMenu;

export const SelectTrigger = styled(Select.Trigger)`
  /* border: 2px solid blue; */
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SelectItem = styled(Select.Item)`
  padding: 0.1rem 0.3rem;
  background-color: white;
  width: 100%;
  font-size: 0.9rem;
`;

export const SelectViewport = styled(Select.Viewport)`
  /* border: 2px solid blue; */
  border: 0.5px solid grey;
  border-radius: 5px;
  min-width: 5rem;
`;

export const Box = styled.div`
  min-width: 6rem;
  /* border: 2px solid red; */
  z-index: 1;
  /* padding: 1em 1.5em; */
  /* position: fixed;
  left: calc(50% - 5rem); */
`;
