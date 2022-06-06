import { Request, Response, NextFunction } from 'express';
import TeamService from '../service/Teams';

export default class TeamController {
  public _teamService: TeamService;
  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this._teamService.getAll();

      return res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const teamId = await this._teamService.getById(id);

      return res.status(200).json(teamId);
    } catch (e) {
      next(e);
    }
  }
}
