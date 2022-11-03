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
import UsersTeamDropdown from "../dropdowns/UsersTeamDropdown";
import {
  FeaturesWrapper,
  SelectWrapper,
  SortButton,
} from "./MemberOfAnnouncements";

const UsersAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
  const [toggleSortState, setToggleSortState] = useState<boolean>(false);
  const selectValue = useAnnouncementStore((state) => state.leaderOfSelect);
  const leaderOfAnnouncements = useAnnouncementStore(
    (state) => state.leaderOfAnnouncements
  );

  useEffect(() => {
    handleFilterAnnouncements(
      selectValue,
      setAnnouncements,
      leaderOfAnnouncements
    );
  }, [selectValue]);

  const handleSort = () => {
    setToggleSortState((state) => !state);
    sortAnnouncements(announcements, setAnnouncements, toggleSortState);
  };

  const convertedhtml = convertAnnouncementsToHtml(announcements).reverse();

  return (
    <>
      <FeaturesWrapper>
        <SelectWrapper>
          <Filter>Filter:</Filter>
          <UsersTeamDropdown selectValue={selectValue} />
        </SelectWrapper>
        <SortButton onClick={handleSort}>Sort</SortButton>
      </FeaturesWrapper>
      <AnnouncementsFeedWrapper>
        {convertedhtml.map((announcement, key) => (
          <div key={key} id={`announcement${key}`}>
            <AnnouncementCard
              announcement={announcement}
              switchKey={1}
              classNameKey={key}
            />
          </div>
        ))}
      </AnnouncementsFeedWrapper>
    </>
  );
};

export default UsersAnnouncements;

export const AnnouncementsFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin-top: 1rem;
  row-gap: 1rem;
  height: 32.5rem;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 500px) {
    width: 100%;
    align-items: center;
  }
`;
