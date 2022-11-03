import React from 'react';
import create from 'zustand';
import { getOneUser } from '../server/axiosRequests/requests';
import { User } from '../server/mongoDB/schemas';

interface UserStoreProps {
  currentUser: User;
  setCurrentUser: (uid: string) => void;
}

export const useCurrentUserStore = create<UserStoreProps>((set) => ({
  currentUser: {
    userId: '',
    dateCreated: '',
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    leaderOf: [],
    memberOf: [],
  },
  setCurrentUser: async (uid: string) => {
    try {
      const foundUser = await getOneUser(uid);
      set({ currentUser: foundUser });
    } catch (error) {
      console.log(error);
    }
  },
}));
