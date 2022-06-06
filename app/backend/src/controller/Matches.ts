import { Request, Response, NextFunction } from 'express';
import MatchesService from '../service/Matches';

export default class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await MatchesService.getAll();
      return res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const teamId = await MatchesService.getByQuery(id);

      return res.status(200).json(teamId);
    } catch (e) {
      next(e);
    }
  }
}
