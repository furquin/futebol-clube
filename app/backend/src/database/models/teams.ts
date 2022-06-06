import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  public id: number;

  public teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  modelName: 'teams',
  timestamps: false,
  sequelize: db,
});
