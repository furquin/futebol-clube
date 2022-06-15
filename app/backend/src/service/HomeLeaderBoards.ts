//!  arquivo consultado em: https://github.com/tryber/sd-016-a-trybe-futebol-clube/pull/49/files#diff-57ab5144c890b3a81652a03fedcae35bd1ac5f94a55a49735e262c3ca9117edb

import TeamService from './Teams';
import MatchesService from './Matches';

import ITeams from '../interface/ITeams';
import IMtaches from '../interface/IMatches';

export default class HomeLeaderBoardService {
  name: string;
  static totalPoints = 0;
  static totalGames = 0;
  static totalVictories = 0;
  static totalDraws = 0;
  static totalLosses = 0;
  static goalsFavor = 0;
  static goalsOwn = 0;
  static goalsBalance = 0;
  static efficiency = 0;

  static async DataMatch(team: ITeams, matches: IMtaches) {
    if (team.id === matches.homeTeam && !matches.inProgress) {
      if (matches.homeTeamGoals > matches.awayTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      }
      if (matches.homeTeamGoals < matches.awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (matches.homeTeamGoals === matches.awayTeamGoals) {
        this.totalPoints += 1;
        this.totalDraws += 1;
      }
      this.totalGames += 1;
      this.goalsFavor += matches.homeTeamGoals;
      this.goalsOwn += matches.awayTeamGoals;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
      this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    }
  }

  static reset() {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  static async leaderboards() {
    const matches = await MatchesService.getAll();
    const teams = await TeamService.getAll();
    return teams.map((team) => {
      matches.forEach((match) => { this.DataMatch(team, match); });
      const resultMatch = { name: team.teamName,
        totalPoints: this.totalPoints,
        totalGames: this.totalGames,
        totalVictories: this.totalVictories,
        totalDraws: this.totalDraws,
        totalLosses: this.totalLosses,
        goalsFavor: this.goalsFavor,
        goalsOwn: this.goalsOwn,
        goalsBalance: this.goalsBalance,
        efficiency: this.efficiency,
      };
      this.reset();
      return resultMatch;
    });
  }

  static async orderedLeaderboards() {
    const leaderBoard = await this.leaderboards();
    return leaderBoard
      .sort((a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
  }
}
