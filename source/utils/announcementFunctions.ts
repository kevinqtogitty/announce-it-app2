import React from 'react';
import Blockquote from '@tiptap/extension-blockquote';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  getAllUsersAnnouncements,
  getASingleTeamsAnnouncements,
} from '../server/axiosRequests/requests';
import {
  AnnouncementProps,
  LeaderAndMemberOfProps,
} from '../server/mongoDB/schemas';

export const getAllMemberOfAnnouncements = async (
  memberOf: LeaderAndMemberOfProps[]
) => {
  const foundAnnouncements: [] = [];
  for (let i = 0; i < memberOf.length; i++) {
    try {
      const teamsAnnouncement = await getASingleTeamsAnnouncements(
        memberOf[i].teamId
      );

      if (teamsAnnouncement) foundAnnouncements.push(teamsAnnouncement);
    } catch (error) {
      console.log(error);
    }
  }

  const flatMappedAnnouncements = foundAnnouncements.flatMap(
    (group: any) => group
  );

  return flatMappedAnnouncements;
};

export const getUsersAnnouncements = async (uid: string) => {
  const announcements = await getAllUsersAnnouncements(uid);
  const flatMappedAnnouncements = announcements.flatMap((group: any) => group);
  return flatMappedAnnouncements;
};

export const convertAnnouncementsToHtml = (
  flatMappedAnnouncements: AnnouncementProps[]
) => {
  const convertedAnnouncements = flatMappedAnnouncements.map(
    (announcement: AnnouncementProps) => ({
      ...announcement,
      content: generateHTML(announcement.content, [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Blockquote,
        Underline,
      ]),
    })
  );

  return convertedAnnouncements;
};

export const handleFilterAnnouncements = (
  selectValue: string,
  setAnnouncements: React.Dispatch<React.SetStateAction<AnnouncementProps[]>>,
  memberOfAnnouncements: AnnouncementProps[]
) => {
  if (selectValue === '') return setAnnouncements(memberOfAnnouncements);
  const filtered = memberOfAnnouncements.filter(
    (announcement: { teamId: string }) => announcement.teamId === selectValue
  );
  setAnnouncements(filtered);
};

export const sortAnnouncements = (
  announcements: AnnouncementProps[],
  setAnnouncements: React.Dispatch<React.SetStateAction<AnnouncementProps[]>>,
  trueOrFalse: boolean
) => {
  let sorted: AnnouncementProps[] = [];
  if (trueOrFalse) {
    sorted = announcements.sort(
      (a, b) =>
        +new Date(b.timestamp).getTime() - +new Date(a.timestamp).getTime()
    );
  } else {
    sorted = announcements.sort(
      (a, b) =>
        +new Date(a.timestamp).getTime() - +new Date(b.timestamp).getTime()
    );
  }

  return setAnnouncements([...sorted]);
};
