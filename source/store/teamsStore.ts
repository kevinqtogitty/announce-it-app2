import React from "react";
import create from "zustand";
import { getAllTeamsUserIsALeaderOf } from "../server/axiosRequests/requests";
import { LeaderAndMemberOfProps } from "../server/mongoDB/schemas";

interface TeamStore {
  teamsUserIsALeaderOf: LeaderAndMemberOfProps[];
  setTeamsUserIsALeaderOf: (uid: string) => void;
  filterTeamsUserIsALeaderOf: (
    teamId: string,
    teamsUserIsALeaderOf: LeaderAndMemberOfProps[]
  ) => void;
  teamsUserIsAMemberOf: LeaderAndMemberOfProps[];
  setTeamsUserIsAMemberOf: (teams: LeaderAndMemberOfProps[]) => void;
  filterTeamsUserIsAMemberOf: (
    teamId: string,
    teamsUserIsAMemberOf: LeaderAndMemberOfProps[]
  ) => void;
  removeTeamUserIsAMemberOf: (
    teams: LeaderAndMemberOfProps[],
    idNumber: number
  ) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamsUserIsALeaderOf: [],
  setTeamsUserIsALeaderOf: async (uid) => {
    try {
      const teamsFound = await getAllTeamsUserIsALeaderOf(uid);
      set({ teamsUserIsALeaderOf: teamsFound });
    } catch (error) {
      console.log(error);
    }
  },
  filterTeamsUserIsALeaderOf: async (teamId, teamsUserIsALeaderOf) => {
    const filteredTeams = teamsUserIsALeaderOf.filter(
      (team) => team.teamId === teamId
    );
    set({ teamsUserIsALeaderOf: [...filteredTeams] });
  },
  teamsUserIsAMemberOf: [],
  setTeamsUserIsAMemberOf: (teams) => {
    set({ teamsUserIsAMemberOf: [...teams] });
  },
  filterTeamsUserIsAMemberOf: async (teamId, teamsUserIsAMemberOf) => {
    const filteredTeams = teamsUserIsAMemberOf.filter(
      (team) => team.teamId === teamId
    );
    set({ teamsUserIsAMemberOf: [...filteredTeams] });
  },
  removeTeamUserIsAMemberOf(teams, idNumber) {
    const updatedTeams = teams;
    updatedTeams.splice(idNumber, 1);
    set({ teamsUserIsAMemberOf: updatedTeams });
  },
}));
