// import { HTMLContent } from '@tiptap/react';
import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { AnnouncementProps } from "../../server/mongoDB/schemas";
import AlertDialog from "../AlertDialog";
import { deleteAnnouncementFromTeam } from "../../server/axiosRequests/requests";
import { useAnnouncementStore } from "../../store/announcementStore";

interface AnnouncementCardProp {
  announcement: AnnouncementProps;
  switchKey?: number;
  classNameKey: number;
}

const AnnouncementCard: React.FC<AnnouncementCardProp> = (
  props
): JSX.Element => {
  const htmlAnnouncementParsed = parse(props.announcement.content);
  const handleDeleteAnnouncement = async () => {
    try {
      await deleteAnnouncementFromTeam(
        props.announcement.teamId,
        props.announcement.announcementId
      );
      document.getElementById(`announcement${props.classNameKey}`).remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <TimeStamp>Posted on {props.announcement.displayDate}</TimeStamp>
      {htmlAnnouncementParsed}
      {props.switchKey ? (
        <AlertDialog
          switchKey={2}
          handleDeleteAnnouncement={handleDeleteAnnouncement}
          teamId={props.announcement.teamId}
          buttonName={"Delete Announcement"}
        />
      ) : null}
    </Card>
  );
};

export default AnnouncementCard;

const Card = styled.div`
  width: 30rem;
  min-height: 5rem;
  border-radius: 10px;
  background-color: white;
  padding: 0.7rem;
  position: relative;
  @media (max-width: 500px) {
    align-self: center;
    width: 95%;
  }
`;

const TimeStamp = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: grey;
`;
