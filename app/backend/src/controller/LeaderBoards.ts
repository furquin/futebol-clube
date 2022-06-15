import { Request, Response, NextFunction } from 'express';
import LeaderBoardsService from '../service/LeaderBoards';

export default class LeaderboardsController {
  static async orderedLeaderboards(_req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await LeaderBoardsService.orderedLeaderboards();
      return res.status(200).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  }
}
