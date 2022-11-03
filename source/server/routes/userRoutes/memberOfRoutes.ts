import { Router } from 'express';
import {
  removeUserFromATeam,
  addUserToATeam,
} from '../../controllers/memberOfController';

const memberOfRouter = Router();

memberOfRouter.delete('/:userId/:update', removeUserFromATeam);
memberOfRouter.post('/:userId/:update', addUserToATeam);

export { memberOfRouter };
