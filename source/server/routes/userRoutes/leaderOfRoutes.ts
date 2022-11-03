import { Router } from 'express';
import {
  deleteATeam,
  createANewTeam,
  getAllTeamsUserIsALeaderOf,
} from '../../controllers/leaderOfController';

const leaderOfRouter = Router();

leaderOfRouter.get('/:userId', getAllTeamsUserIsALeaderOf);
leaderOfRouter.delete('/:userId/:update', deleteATeam);
leaderOfRouter.post('/:userId/:update', createANewTeam);

export { leaderOfRouter };
