import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';
import IMatches from '../interface/IMatches';

export default class TeamService {
  static async getAll(): Promise<IMatches[]> {
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

  static async getByProgress(inProgress: any): Promise<IMatches[]> {
    let progress = 1;
    if (inProgress !== 'true') { progress = 0; }

    const inProgressMatches = await MatchesModel.findAll({ where: { inProgress: progress },
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
      ] });
    return inProgressMatches;
  }
}
