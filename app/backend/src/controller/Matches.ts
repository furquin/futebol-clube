import { Request, Response, NextFunction } from 'express';
import MatchesService from '../service/Matches';

export default class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const matches = await MatchesService.getByProgress(inProgress);

        return res.status(200).json(matches);
      }
      const matches = await MatchesService.getAll();
      return res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }

  static async newMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatches = await MatchesService.newMatches(req.body);

      return res.status(201).json(newMatches);
    } catch (e) {
      next(e);
    }
  }
}
