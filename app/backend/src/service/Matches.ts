import MatchesModel from '../database/models/matches';

export default class TeamService {
  static async getAll(): Promise<any> {
    const Matches = await MatchesModel.findAll();
    return Matches;
  }

  static async getByQuery(inProgress: number | string): Promise<any> {
    const inProgressMatches = await MatchesModel.findAll({ where: { inProgress } });
    return inProgressMatches;
  }
}
