import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesModel from '../database/models/matches';
import TeamsModel from '../database/models/teams';

import MatchesLeaderboardHome from "./mocks/MatchesLeaderboardHome"
import TeamsLeaderboardHome from "./mocks/TeamLeaderboardHome"

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes nas rotas de leaderboard', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves( MatchesLeaderboardHome as MatchesModel[] );sinon
      .stub(TeamsModel, "findAll")
      .resolves( TeamsLeaderboardHome as TeamsModel[]  );
  });
    

  afterEach(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

    it('Mostra tabela com base nos jogos em jogados em casa', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')

        expect(chaiHttpResponse.body).to.be.length(4)
        expect(chaiHttpResponse.body[0]).to.have.property('name').equal('Avaí/Kindermann')
        expect(chaiHttpResponse.body[0]).to.have.property('totalPoints').equal(4)
        expect(chaiHttpResponse.body[0]).to.have.property('totalGames').equal(2)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalVictories').equal(1)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalDraws').equal(1) 
        expect(chaiHttpResponse.body[0]).to.have.property('totalLosses').equal(0) 
        expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor').equal(4)  
        expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn').equal(1)   
        expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance').equal(3)  
        expect(chaiHttpResponse.body[0]).to.have.property('efficiency').equal(66.67)       
        
    });
        
    it('Mostra tabela com base nos jogos em jogados como visitante', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')

        expect(chaiHttpResponse.body).to.be.length(4)
        expect(chaiHttpResponse.body[0]).to.have.property('name').equal('Avaí/Kindermann')
        expect(chaiHttpResponse.body[0]).to.have.property('totalPoints').equal(6)
        expect(chaiHttpResponse.body[0]).to.have.property('totalGames').equal(2)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalVictories').equal(2)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalDraws').equal(0) 
        expect(chaiHttpResponse.body[0]).to.have.property('totalLosses').equal(0) 
        expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor').equal(4)  
        expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn').equal(0)   
        expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance').equal(4)  
        expect(chaiHttpResponse.body[0]).to.have.property('efficiency').equal(100)     
        
    });
        
    it('Mostra tabela com base em todos jogos', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')

        expect(chaiHttpResponse.body).to.be.length(4)
        expect(chaiHttpResponse.body[0]).to.have.property('name').equal('Avaí/Kindermann')
        expect(chaiHttpResponse.body[0]).to.have.property('totalPoints').equal(10)
        expect(chaiHttpResponse.body[0]).to.have.property('totalGames').equal(4)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalVictories').equal(3)  
        expect(chaiHttpResponse.body[0]).to.have.property('totalDraws').equal(1) 
        expect(chaiHttpResponse.body[0]).to.have.property('totalLosses').equal(0) 
        expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor').equal(8)  
        expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn').equal(1)   
        expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance').equal(7)  
        expect(chaiHttpResponse.body[0]).to.have.property('efficiency').equal(83.33)        
    });
    
});
