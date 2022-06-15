import { Router } from 'express';
import HomeLearderboardsController from '../controller/HomeLeaderBoards';
import AwayLearderboardsController from '../controller/AwayLeaderBoards';

const leaderBoard = Router();

export default leaderBoard
  .get('/home', HomeLearderboardsController.orderedLeaderboards)
  .get('/away', AwayLearderboardsController.orderedLeaderboards);
