import { Request, Response, NextFunction } from 'express';
import HomeLeaderBoardsService from '../service/HomeLeaderBoards';

export default class HomeLeaderboardsController {
  static async orderedLeaderboards(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await HomeLeaderBoardsService.orderedLeaderboards();
      return res.status(200).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  }
}
