import TeamModel from '../database/models/teams';
import ITeams from '../interface/ITeams';

export default class TeamService {
  _teamModel: TeamModel;

  constructor(teamModel: TeamModel) {
    this._teamModel = teamModel;
  }

  async getAll(): Promise<ITeams[]> {
    this._teamModel = new TeamModel();
    const teams = await TeamModel.findAll();
    return teams;
  }

  async getById(id: number | string): Promise<ITeams | null> {
    this._teamModel = new TeamModel();
    const teamId = await TeamModel.findByPk(id);
    return teamId;
  }
}
