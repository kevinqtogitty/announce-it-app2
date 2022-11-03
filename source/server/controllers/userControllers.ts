/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { User } from '../mongoDB/schemas';

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const users = await User.find({});
  return res.status(200).json(users);
};

const getOneUserById = async (req: Request, res: Response): Promise<any> => {
  const id: string = req.params.userId;
  try {
    const foundUser = await User.findOne({ userId: `${id}` });
    if (!foundUser) res.status(404).send('User is not found');
    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteOneUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id: string = req.params.userId;
  try {
    const foundUser = await User.findOneAndDelete({ userId: `${id}` });
    if (!foundUser) res.status(404).send('User is not found');
    return res.status(200).send('User sucessfully deleted');
  } catch (error) {
    console.log(error);
  }
};

const addNewUserToDatabase = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { body } = req;
  const newUser = new User({
    userId: body.userId,
    dateCreated: body.dateCreated,
    personalDetails: {
      firstName: body.personalDetails.firstName,
      lastName: body.personalDetails.lastName,
      email: body.personalDetails.email,
    },
    leaderOf: [],
    memberOf: [],
  });

  try {
    const entryCreated = await newUser.save();
    return res.status(200).json(entryCreated);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersByTeam = async (req: Request, res: Response): Promise<any> => {
  const teamToFind = req.params.teamName;
  try {
    const foundUsers = await User.find({ memberOf: { memberOf: teamToFind } });
    return res.status(200).json(foundUsers);
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllUsers,
  getOneUserById,
  addNewUserToDatabase,
  deleteOneUserById,
  getAllUsersByTeam,
};
