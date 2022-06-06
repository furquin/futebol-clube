import { Router } from 'express';
import TeamController from '../controller/Teams';

const team = Router();

export default team
  .get('/', TeamController.getAll)
  .get('/:id', TeamController.getById);
