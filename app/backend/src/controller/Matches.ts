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

  static async finishMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await MatchesService.finishMatches(id);

      return res.status(200).json({ message: 'Finished!' });
    } catch (e) {
      next(e);
    }
  }

  static async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchesService.updateGoals(id, req.body);

      return res.status(200).json({ message: 'Updated goals!' });
    } catch (e) {
      next(e);
    }
  }
}
