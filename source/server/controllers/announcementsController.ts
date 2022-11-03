import { Request, Response, NextFunction } from "express";
import { uniqueIdGenerator } from "../../utils/mongooseHelperFunctions";
import { error500 } from "../errorHandler/errorHandler";
import { AnnouncementProps, TeamProps, Teams } from "../mongoDB/schemas";

const getAllAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.userId;

  try {
    const teamsUserIsALeaderOf = await Teams.find({ teamLeaderId: userId });
    const allAnnouncements = teamsUserIsALeaderOf.map((team) =>
      team.announcements.map((announcement) => announcement)
    );
    return res.status(200).json(allAnnouncements);
  } catch (error) {
    console.log(error);
  }
};

const getSingleMemberOfAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const teamId: string = req.params.teamId;
  try {
    const foundTeam = await Teams.findOne({ teamId: teamId });
    return res.status(200).json(foundTeam?.announcements);
  } catch (error) {
    console.log(error);
  }
};

const addNewAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const teamId: string = req.params.teamId;
  const announcement = req.body;
  const newAnnouncement: AnnouncementProps = {
    content: announcement,
    displayDate: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    timestamp: new Date(),
    announcementId: uniqueIdGenerator(),
    teamId: teamId,
  };

  try {
    const teamFound: any = await Teams.findOne({ teamId: teamId });
    teamFound.announcements.push(newAnnouncement);
    teamFound.save();
    return res.status(200).json(teamFound);
  } catch (error) {
    return next(error);
  }
};

const deleteAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const teamId: string = req.params.teamId;
  const announcementId: string = req.params.announcementId;

  const foundTeam: any = await Teams.findOne({ teamId: teamId });
  const indexToRemove = foundTeam.announcements.findIndex(
    (announcement: { announcementId: number }) =>
      announcement.announcementId === parseInt(announcementId)
  );

  if (indexToRemove === -1) {
    next(error500);
  }

  foundTeam.announcements.splice(indexToRemove, 1);
  foundTeam.save();

  return res.status(200).send("made it");
};

export {
  addNewAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getSingleMemberOfAnnouncements,
};
