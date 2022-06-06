import { Request, Response, NextFunction } from 'express';
import TeamService from '../service/Teams';

export default class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamService.getAll();
      return res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const teamId = await TeamService.getById(id);

      return res.status(200).json(teamId);
    } catch (e) {
      next(e);
    }
  }
}
