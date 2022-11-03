import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnnouncementProps } from "../../server/mongoDB/schemas";
import { useAnnouncementStore } from "../../store/announcementStore";
import {
  convertAnnouncementsToHtml,
  handleFilterAnnouncements,
  sortAnnouncements,
} from "../../utils/announcementFunctions";
import { Filter } from "../AnnouncementFeed";
import AnnouncementCard from "../cards/AnnouncementCard";
import MemberTeamDropdownMenu from "../dropdowns/MemberTeamDropdownMenu";
import { AnnouncementsFeedWrapper } from "./UsersAnnouncements";

const MemberOfAnnouncements: React.FC = (): JSX.Element => {
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
  const [toggleSortState, setToggleSortState] = useState<boolean>(false);
  const selectValue = useAnnouncementStore((state) => state.memberOfSelect);
  const memberOfAnnouncements = useAnnouncementStore(
    (state) => state.memberOfAnnouncements
  );

  useEffect(() => {
    handleFilterAnnouncements(
      selectValue,
      setAnnouncements,
      memberOfAnnouncements
    );
  }, [selectValue]);

  const handleSort = () => {
    setToggleSortState((state) => !state);
    sortAnnouncements(announcements, setAnnouncements, toggleSortState);
  };

  const convertedHtml = convertAnnouncementsToHtml(announcements).reverse();

  return (
    <>
      <FeaturesWrapper>
        <SelectWrapper>
          <Filter>Filter:</Filter>
          <MemberTeamDropdownMenu selectValue={selectValue} />
        </SelectWrapper>
        <SortButton onClick={handleSort}>Sort</SortButton>
      </FeaturesWrapper>
      <AnnouncementsFeedWrapper>
        {convertedHtml.map((announcement, key) => (
          <AnnouncementCard
            key={key}
            announcement={announcement}
            classNameKey={0}
          />
        ))}
      </AnnouncementsFeedWrapper>
    </>
  );
};

export default MemberOfAnnouncements;

export const FeaturesWrapper = styled.div`
  display: flex;
  column-gap: 0.5rem;
  justify-content: space-between;
`;

export const SelectWrapper = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;
export const SortButton = styled.button`
  align-self: center;
`;

export const Header = styled.h2`
  position: absolute;
  color: rgb(228, 132, 0);
  font-weight: 900;
  top: 0rem;
  font-size: 5rem;
  margin: 0;
  left: 1rem;
  letter-spacing: -10px;
  @media (max-width: 500px) {
    left: 1rem;
    font-size: 4rem;
  }
`;
