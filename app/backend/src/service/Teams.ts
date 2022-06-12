import TeamModel from '../database/models/teams';
import ITeams from '../interface/ITeams';

export default class TeamService {
  static async getAll(): Promise<ITeams[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getById(id: number | string): Promise<ITeams | null> {
    const teamId = await TeamModel.findByPk(id);
    return teamId;
  }
}
