import { Router } from 'express';
import {
  addNewUserToDatabase,
  deleteOneUserById,
  getAllUsers,
  getAllUsersByTeam,
  getOneUserById,
} from '../../controllers/userControllers';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getOneUserById);
userRouter.get('/team/:teamName', getAllUsersByTeam);

userRouter.post('/', addNewUserToDatabase);
userRouter.delete('/:userId', deleteOneUserById);

export { userRouter };
