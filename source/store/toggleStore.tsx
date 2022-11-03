import React from 'react';
import create from 'zustand';

interface ToggleProps {
  feedState: boolean;
  toggleFeed: () => void;
}

export const useToggle = create<ToggleProps>((set) => ({
  feedState: false,
  toggleFeed: () =>
    set((state: { feedState: boolean }) => ({ feedState: !state.feedState })),
}));
