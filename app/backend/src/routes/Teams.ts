import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controller/Teams';
import TeamService from '../service/Teams';
import TeamModel from '../database/models/teams';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const team = Router();

export default team
  .get('/', (req: Request, res: Response, next: NextFunction) =>
    teamController.getAll(req, res, next))
  .get('/:id', (req: Request, res: Response, next: NextFunction) =>
    teamController.getById(req, res, next));
