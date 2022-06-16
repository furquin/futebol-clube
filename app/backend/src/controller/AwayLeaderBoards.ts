import { Request, Response, NextFunction } from 'express';
import AwayLeaderBoardsService from '../service/AwayLeaderBoards';

export default class AwayLeaderboardsController {
  static async orderedLeaderboards(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await AwayLeaderBoardsService.orderedLeaderboards();
      return res.status(200).json(leaderBoard);
    } catch (e) {
      next(e);
    }
  }
}
