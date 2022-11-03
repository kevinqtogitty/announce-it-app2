/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { checkIfUserIsAlreadyPartOfTeam } from "../../utils/mongooseHelperFunctions";
import { error400, error404 } from "../errorHandler/errorHandler";
import { Teams, User } from "../mongoDB/schemas";

const addUserToATeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.userId;
  const teamToJoinId: string = req.params.update;
  try {
    const entryUpdated: any = await User.findOne({ userId: id });
    if (checkIfUserIsAlreadyPartOfTeam(entryUpdated.memberOf, teamToJoinId)) {
      return next(error404);
    } else {
      const foundTeamToJoin = await Teams.findOne({ teamId: teamToJoinId });
      const newMember = {
        firstName: entryUpdated.personalDetails.firstName,
        lastName: entryUpdated.personalDetails.lastName,
        userId: entryUpdated.userId,
      };
      const newTeam = {
        teamId: foundTeamToJoin?.teamId,
        teamName: foundTeamToJoin?.teamName,
      };
      foundTeamToJoin?.teamMembers?.push(newMember);
      entryUpdated.memberOf.push(newTeam);
      foundTeamToJoin?.save();
      entryUpdated.save();
      return res
        .status(200)
        .json([entryUpdated.memberOf, foundTeamToJoin?.teamMembers]);
    }
  } catch (error) {
    return next(error);
  }
};

const removeUserFromATeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.userId;
  const teamToLeaveId: string = req.params.update;
  try {
    //find the user
    const entryUpdated = await User.findOne({ userId: id });
    const foundTeamToLeave = await Teams.findOne({ teamId: teamToLeaveId });
    //find the index of th teamId to leave
    const indexToRemove = entryUpdated?.memberOf.findIndex(
      (team: { teamId: string }) => team.teamId === teamToLeaveId
    );
    console.log(indexToRemove);
    if (indexToRemove === -1) {
      console.log("1st");

      return next(error400);
    }
    //find the index of the user to remove from the
    const indexOfUserInTeamToRemove = foundTeamToLeave?.teamMembers?.findIndex(
      (user) => user.userId === id
    );

    if (indexOfUserInTeamToRemove === -1) {
      console.log("2nd");
      return next(error400);
    }
    //remove the team from the user
    entryUpdated.memberOf.splice(indexToRemove, 1);
    foundTeamToLeave.teamMembers.splice(indexOfUserInTeamToRemove, 1);
    entryUpdated.save();
    foundTeamToLeave.save();
    //remove user from the team
    return res
      .status(200)
      .json([{ updatedEntry: entryUpdated }, { teamIdremoved: teamToLeaveId }]);
  } catch (error) {
    return next(error);
  }
};

export { addUserToATeam, removeUserFromATeam };
