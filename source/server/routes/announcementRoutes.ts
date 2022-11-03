import { Router } from "express";
import {
  addNewAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getSingleMemberOfAnnouncements,
} from "../controllers/announcementsController";

const announcementRouter = Router();

announcementRouter.get("/:userId", getAllAnnouncements);
announcementRouter.get(
  "/teamAnnouncement/:teamId",
  getSingleMemberOfAnnouncements
);
announcementRouter.post("/:userId/:teamId", addNewAnnouncement);
announcementRouter.delete("/:teamId/:announcementId", deleteAnnouncement);

export default announcementRouter;
