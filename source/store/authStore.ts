import React from 'react';
import create from 'zustand';

interface StoreType {
  auth: boolean;
  ChangeAuthorization: () => void;
}

export const useStore = create<StoreType>((set) => ({
  auth: false,
  ChangeAuthorization: () =>
    set((state: { auth: boolean }) => ({ auth: !state.auth })),
}));
