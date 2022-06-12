import { Router } from 'express';
import HomeLearderboardsController from '../controller/HomeLeaderBoards';

const leaderBoard = Router();

export default leaderBoard
  .get('/', HomeLearderboardsController.orderedLeaderboards);
