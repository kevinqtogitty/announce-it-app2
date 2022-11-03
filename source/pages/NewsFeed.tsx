import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/named
import AnnouncementFeed from "../components/AnnouncementFeed";
import { useAnnouncementStore } from "../store/announcementStore";
import { useTeamStore } from "../store/teamsStore";
import { useCurrentUserStore } from "../store/userStore";

const NewsFeed: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const teamsUserIsALeaderOf = useTeamStore(
    (state) => state.teamsUserIsALeaderOf
  );
  const teamsUserIsAMemberOf = useTeamStore(
    (state) => state.teamsUserIsAMemberOf
  );
  const setLeaderOfAnnouncements = useAnnouncementStore(
    (state) => state.setLeaderOfAnnouncements
  );
  const setMemberOfAnnouncements = useAnnouncementStore(
    (state) => state.setMemberOfAnnouncements
  );

  useEffect(() => {
    setCurrentUser(auth.currentUser.uid);
  }, [teamsUserIsALeaderOf, teamsUserIsAMemberOf]);

  useEffect(() => {
    setLeaderOfAnnouncements(auth.currentUser.uid);
  }, []);

  useEffect(() => {
    setMemberOfAnnouncements(currentUser.memberOf);
    setIsLoading(false);
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <AnnouncementFeed />}</>;
};

export default NewsFeed;
