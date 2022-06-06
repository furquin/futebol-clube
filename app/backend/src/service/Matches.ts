import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';

export default class TeamService {
  static async getAll(): Promise<any> {
    const Matches = await MatchesModel.findAll({
      include: [
        { model: TeamModel,
          as: 'teamHome',
          attributes: {
            exclude: ['id'],
          } },
        { model: TeamModel,
          as: 'teamAway',
          attributes: {
            exclude: ['id'],
          } },
      ],

    });
    return Matches;
  }

  static async getByQuery(inProgress: number | string): Promise<any> {
    const inProgressMatches = await MatchesModel.findAll({ where: { inProgress } });
    return inProgressMatches;
  }
}
