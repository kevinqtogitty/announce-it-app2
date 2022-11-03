import axios from "axios";
const baseUrl = "http://localhost:4000";

const getAllUsers = async () => {
  const { data } = await axios.get(`${baseUrl}`);
  return data;
};

const storeNewUser = async <T>(newUserObject: T) => {
  const { data } = await axios.post(`${baseUrl}`, newUserObject);
  return data;
};

const getOneUser = async (userId: string) => {
  const { data } = await axios.get(`${baseUrl}/${userId}`);
  return data;
};

const deletOneUser = async (userId: string) => {
  const { data } = await axios.delete(`${baseUrl}/${userId}`);
  return data;
};

const getAllTeamsUserIsALeaderOf = async (userId: string) => {
  const { data } = await axios.get(`${baseUrl}/leaderOf/${userId}`);
  return data;
};

const createANewTeam = async (userId: string, newTeamName: string) => {
  const { data } = await axios.post(
    `${baseUrl}/leaderOf/${userId}/${newTeamName}`
  );
  return data;
};

const deleteATeam = async (userId: string, teamId: string) => {
  const { data } = await axios.delete(
    `${baseUrl}/leaderOf/${userId}/${teamId}`
  );
  return data;
};

const addUserToATeam = async (userId: string, newTeamName: string) => {
  const { data } = await axios.post(
    `${baseUrl}/memberOf/${userId}/${newTeamName}`
  );
  return data;
};

const removeUserFromATeam = async (userId: string, teamId: string) => {
  const { data } = await axios.delete(
    `${baseUrl}/memberOf/${userId}/${teamId}`
  );
  return data;
};

const getAllUsersAnnouncements = async (userId: string) => {
  const { data } = await axios.get(`${baseUrl}/announcements/${userId}`);
  return data;
};

const getASingleTeamsAnnouncements = async (teamId: string) => {
  const { data } = await axios.get(
    `${baseUrl}/announcements/teamAnnouncement/${teamId}`
  );
  return data;
};

const postAnnouncementToTeam = async <T>(
  userId: string,
  teamId: string,
  announcement: T
) => {
  const { data } = await axios.post(
    `${baseUrl}/announcements/${userId}/${teamId}`,
    announcement
  );
  return data;
};

const deleteAnnouncementFromTeam = async (
  teamId: string,
  announcementId: number
) => {
  const { data } = await axios.delete(
    `${baseUrl}/announcements/${teamId}/${announcementId}`
  );
  return data;
};

export {
  getAllUsers,
  storeNewUser,
  getOneUser,
  deletOneUser,
  createANewTeam,
  deleteATeam,
  addUserToATeam,
  removeUserFromATeam,
  postAnnouncementToTeam,
  deleteAnnouncementFromTeam,
  getAllTeamsUserIsALeaderOf,
  getAllUsersAnnouncements,
  getASingleTeamsAnnouncements,
};
