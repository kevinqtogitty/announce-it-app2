import { NextFunction, Request, Response } from "express";
import { uniqueIdGenerator } from "../../utils/mongooseHelperFunctions";
import { teamMemberProps, Teams, User } from "../mongoDB/schemas";

const getAllTeamsUserIsALeaderOf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const teamsFound = await Teams.find({ teamLeaderId: userId });
  res.status(200).json(teamsFound);
};

const createANewTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.userId;
  const teamToJoin: string = req.params.update;
  try {
    const entryUpdated: any = await User.findOne({ userId: `${id}` });
    const generatedTeamId = uniqueIdGenerator().toString();
    const newTeam = new Teams({
      teamName: teamToJoin,
      teamId: generatedTeamId,
      teamLeaderId: entryUpdated.userId,
    });

    const newUserIsLeaderOf = {
      teamId: generatedTeamId,
      teamName: teamToJoin,
    };
    entryUpdated.leaderOf.push(newUserIsLeaderOf);
    newTeam.save();
    entryUpdated.save();
    return res.status(200).json(entryUpdated);
  } catch (error) {
    console.log(error);
  }
};

const deleteATeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.userId;
  const teamToLeave: string = req.params.update;
  try {
    const entryUpdated: any = await User.findOne({ userId: id });
    const teamToDelete: any = await Teams.findOneAndDelete({
      teamId: teamToLeave,
    });

    const members = teamToDelete.teamMembers;
    members.forEach(async (element: teamMemberProps) => {
      const foundMember = await User.findOne({ userId: element.userId });
      console.log(foundMember);
      const index = foundMember.memberOf.findIndex(
        (team) => team.teamId === teamToLeave
      );
      foundMember.memberOf.splice(index, 1);
      foundMember.save();
    });

    entryUpdated.save();
    return res
      .status(200)
      .json([{ updated: entryUpdated }, { deleted: teamToDelete }]);
  } catch (error) {
    next(error);
  }
};

export { createANewTeam, deleteATeam, getAllTeamsUserIsALeaderOf };
