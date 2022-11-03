import create from 'zustand';
import {
  AnnouncementProps,
  LeaderAndMemberOfProps,
} from '../server/mongoDB/schemas';
import {
  getUsersAnnouncements,
  getAllMemberOfAnnouncements,
} from '../utils/announcementFunctions';

interface AnnouncementStoreProps {
  leaderOfAnnouncements: [];
  setLeaderOfAnnouncements: (uid: string) => void;
  leaderOfSelect: string;
  setLeaderOfSelect: (select: string) => void;
  memberOfAnnouncements: AnnouncementProps[];
  setMemberOfAnnouncements: (memberOf: LeaderAndMemberOfProps[]) => void;
  memberOfSelect: string;
  setMemberOfSelect: (select: string) => void;
}

export const useAnnouncementStore = create<AnnouncementStoreProps>((set) => ({
  leaderOfAnnouncements: [],
  setLeaderOfAnnouncements: async (uid) => {
    const announcements = await getUsersAnnouncements(uid);
    set({ leaderOfAnnouncements: announcements });
  },
  leaderOfSelect: '',
  setLeaderOfSelect: (string) => set({ leaderOfSelect: string }),
  memberOfAnnouncements: [],
  setMemberOfAnnouncements: async (memberOf) => {
    const announcements = await getAllMemberOfAnnouncements(memberOf);
    set({ memberOfAnnouncements: announcements });
  },
  memberOfSelect: '',
  setMemberOfSelect: (string) => set({ memberOfSelect: string }),
}));
