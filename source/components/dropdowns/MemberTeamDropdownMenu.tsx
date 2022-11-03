import React, { useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import {
  Box,
  SelectItem,
  SelectTrigger,
  SelectViewport,
} from './TeamDropdownMenu';
import { useTeamStore } from '../../store/teamsStore';
import { useCurrentUserStore } from '../../store/userStore';
import { useAnnouncementStore } from '../../store/announcementStore';

interface SelectMemberOfProps {
  teamId: string;
  teamName: string;
}

export interface AnnoucementDropDownProps {
  selectValue: string;
}

const MemberTeamDropdownMenu: React.FC<AnnoucementDropDownProps> = (props) => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setTeamSelected = useAnnouncementStore(
    (state) => state.setMemberOfSelect
  );
  const memberOf: SelectMemberOfProps[] = useTeamStore(
    (state) => state.teamsUserIsAMemberOf
  );
  const setTeamsUserIsAMemberOf = useTeamStore(
    (state) => state.setTeamsUserIsAMemberOf
  );

  useEffect(() => {
    setTeamsUserIsAMemberOf(currentUser.memberOf);
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
          <Select.Value placeholder="Teams your apart of" />
          <Select.Icon />
        </SelectTrigger>
        <Select.Content>
          <SelectViewport>
            <SelectItem key={0} value={''}>
              <Select.ItemText>Show all</Select.ItemText>
            </SelectItem>
            {memberOf.map((team, id) => (
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

export default MemberTeamDropdownMenu;
