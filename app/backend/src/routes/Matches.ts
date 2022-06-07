import { Router } from 'express';
import MatchesController from '../controller/Matches';
import Token from '../middleware/token';

const matches = Router();

export default matches
  .get('/', MatchesController.getAll)
  .post('/', Token.validate, MatchesController.newMatches);
