import { Router } from 'express';
import MatchesController from '../controller/Matches';

const matches = Router();

export default matches
  .get('/', MatchesController.getAll);
