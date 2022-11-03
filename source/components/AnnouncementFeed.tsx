import React, { useState } from "react";
import styled from "styled-components";
import MemberOfAnnouncements from "./feeds/MemberOfAnnouncements";
import UsersAnnouncements from "./feeds/UsersAnnouncements";

const AnnouncementFeed = () => {
  const [toggleFeed, setToggleFeed] = useState<boolean>(true);

  return (
    <FeedAndFeaturesContainer>
      {toggleFeed ? (
        <FeedHeader>Announcements from your groups</FeedHeader>
      ) : (
        <FeedHeader>Your Announcements</FeedHeader>
      )}
      <ToggleFeedButton onClick={() => setToggleFeed((state) => !state)}>
        See: {toggleFeed ? "Your announcements" : "Group announcements"}
      </ToggleFeedButton>
      <FeedContainer>
        {toggleFeed ? <MemberOfAnnouncements /> : <UsersAnnouncements />}
      </FeedContainer>
    </FeedAndFeaturesContainer>
  );
};

export default AnnouncementFeed;

const ToggleFeedButton = styled.button`
  align-self: center;
  border: 0.5px solid grey;
  cursor: pointer;
  color: rgb(255, 255, 255);
  background-color: rgb(200, 70, 70);
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  z-index: 1;
`;

const FeedContainer = styled.section`
  display: flex;
  flex-direction: column;
  /* border: 2px solid red; */
  height: 100%;
`;

const FeedAndFeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  min-width: 30rem;
  height: 45rem;
  @media (max-width: 500px) {
    position: absolute;
    top: 10rem;
    left: calc(50% - 48%);
    min-width: 0rem;
    width: 95%;
    text-align: center;
    align-items: space-evenly;
  }
`;

const FeedHeader = styled.h2`
  color: rgb(255, 255, 255);
  align-self: center;
  margin: 0.3rem;
`;

export const Filter = styled.p`
  color: rgb(255, 255, 255);
  margin: 0;
`;
