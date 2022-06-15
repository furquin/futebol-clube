import { Router } from 'express';
import HomeLearderboardsController from '../controller/HomeLeaderBoards';
import AwayLearderboardsController from '../controller/AwayLeaderBoards';
import LearderboardsController from '../controller/LeaderBoards';

const leaderBoard = Router();

export default leaderBoard
  .get('/', LearderboardsController.orderedLeaderboards)
  .get('/home', HomeLearderboardsController.orderedLeaderboards)
  .get('/away', AwayLearderboardsController.orderedLeaderboards);
