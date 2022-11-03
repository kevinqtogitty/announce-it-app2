import * as Select from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import { LeaderAndMemberOfProps } from '../../server/mongoDB/schemas';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useTeamStore } from '../../store/teamsStore';
import { useCurrentUserStore } from '../../store/userStore';
import { AnnoucementDropDownProps } from './MemberTeamDropdownMenu';
import {
  Box,
  SelectItem,
  SelectTrigger,
  SelectViewport,
} from './TeamDropdownMenu';

interface SelectLeaderOfProps {
  teamId: string;
  teamName: string;
}

const UsersTeamDropdown: React.FC<AnnoucementDropDownProps> = (props) => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setTeamSelected = useAnnouncementStore(
    (state) => state.setLeaderOfSelect
  );
  const leaderOf: SelectLeaderOfProps[] = useTeamStore(
    (state) => state.teamsUserIsALeaderOf
  );
  const setTeamsUserIsALeaderOf = useTeamStore(
    (state) => state.setTeamsUserIsALeaderOf
  );

  useEffect(() => {
    setTeamsUserIsALeaderOf(currentUser.userId);
  }, []);

  const handleSelectChange = (value: string) => {
    setTeamSelected(value);
  };

  return (
    <Box>
      <Select.Root
        defaultValue={props.selectValue}
        onValueChange={(value) => handleSelectChange(value)}
      >
        <SelectTrigger>
          <Select.Value placeholder="All of your teams" />
          <Select.Icon />
        </SelectTrigger>
        <Select.Content>
          <SelectViewport>
            <SelectItem key={0} value={''}>
              <Select.ItemText>Show all</Select.ItemText>
            </SelectItem>
            {leaderOf.map((team, id) => (
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

export default UsersTeamDropdown;
