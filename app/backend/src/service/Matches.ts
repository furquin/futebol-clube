import Unauthorized from '../error/unauthorized';
import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';
import IMatches from '../interface/IMatches';
import IDataMatches from '../interface/IDataMatches';
import INewMatches from '../interface/INewMatches';
import NotFound from '../error/notFound';

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

  static async newMatches(data: IDataMatches): Promise<INewMatches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

    let progress = 1;
    if (inProgress !== true) { progress = 0; }
    if (homeTeam === awayTeam) {
      throw new Unauthorized('It is not possible to create a match with two equal teams');
    }
    const homeTeamMatche = await TeamModel.findOne({ where: { id: homeTeam } });
    const awayTeamMatche = await TeamModel.findOne({ where: { id: awayTeam } });

    if (!homeTeamMatche || !awayTeamMatche) {
      throw new NotFound('There is no team with such id!');
    }
    const newMatches = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: progress });
    return newMatches;
  }

  static async finishMatches(id: number | string): Promise<void> {
    await MatchesModel.update({ inProgress: 0 }, { where: { id } });
  }
}
