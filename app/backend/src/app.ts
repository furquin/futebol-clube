import * as express from 'express';
import LoginRoute from './routes/Login';
import TeamRoute from './routes/Teams';
import MatchesRoute from './routes/Matches';
import LeaderboardsRoute from './routes/Leaderboards';

import Error from './middleware/error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', LoginRoute);
    this.app.use('/teams', TeamRoute);
    this.app.use('/matches', MatchesRoute);
    this.app.use('/leaderboard', LeaderboardsRoute);

    this.app.use(Error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on ${PORT}`));
  }
}

export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
