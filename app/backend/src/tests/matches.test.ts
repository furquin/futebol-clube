import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/matches';

import { Response } from 'superagent';
import MatchesMock from "./mocks/MatchesMock"
import MatchesMockTrue from "./mocks/MatchesMockTrue"

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes nas rotas de matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves( MatchesMock as MatchesModel[]);sinon
  });
    

  afterEach(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })

  it('Lista todas as partidas', async () => {
    chaiHttpResponse = await chai
       .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.length(5)
    expect(chaiHttpResponse.body[0]).to.be.property('id')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('inProgress')
  });
  it('Lista partidas com inProgress === false', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .set('query', 'false')
    
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.length(5)
    expect(chaiHttpResponse.body[0]).to.be.property('id')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('inProgress')
    expect(chaiHttpResponse.body[0].inProgress).to.be.equal(false)
    expect(chaiHttpResponse.body[1].inProgress).to.be.equal(false)
    expect(chaiHttpResponse.body[2].inProgress).to.be.equal(false)
    expect(chaiHttpResponse.body[3].inProgress).to.be.equal(false)
    expect(chaiHttpResponse.body[4].inProgress).to.be.equal(false)
  });
});

describe('Teste nas rotas de matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MatchesMockTrue as MatchesModel[]); sinon
  });
    

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
  it('Lista partidas com inProgress === true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .set('query', 'true')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.length(5)
    expect(chaiHttpResponse.body[0]).to.be.property('id')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeam')
    expect(chaiHttpResponse.body[0]).to.be.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0]).to.be.property('inProgress')
    expect(chaiHttpResponse.body[0].inProgress).to.be.equal(true)
    expect(chaiHttpResponse.body[1].inProgress).to.be.equal(true)
    expect(chaiHttpResponse.body[2].inProgress).to.be.equal(true)
    expect(chaiHttpResponse.body[3].inProgress).to.be.equal(true)
    expect(chaiHttpResponse.body[4].inProgress).to.be.equal(true)
  });

})

describe('Teste nas rotas de matches', async () => {
  let chaiHttpResponse: Response;
  let LoginResponse: Response

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "create")
      .resolves({
        "id": 49,
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      } as MatchesModel); sinon
  });
    

  afterEach(() => {
    (MatchesModel.create as sinon.SinonStub).restore();
  })
  
  it('Criar uma nova partida com sucesso', async () => {
    LoginResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      })
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', LoginResponse.body.token)
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      })
    expect(chaiHttpResponse.status).to.be.equal(201)
    expect(chaiHttpResponse.body).to.be.property('id')
    expect(chaiHttpResponse.body.id).to.be.equal(49)
    expect(chaiHttpResponse.body).to.be.property('homeTeam')
    expect(chaiHttpResponse.body).to.be.property('awayTeam')
    expect(chaiHttpResponse.body).to.be.property('homeTeamGoals')
    expect(chaiHttpResponse.body).to.be.property('awayTeamGoals')
    expect(chaiHttpResponse.body).to.be.property('inProgress')
    expect(chaiHttpResponse.body.inProgress).to.be.equal(true)
  });
  it('Não é possível criar uma nova partida com time inexistente', async () => {
    LoginResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      })
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', LoginResponse.body.token)
      .send({
        "homeTeam": 20,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      })
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body).to.be.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal("There is no team with such id!")
  });
  it('Não é possível criar uma nova partida com times iguais', async () => {
    LoginResponse = await chai
      .request(app)
      .post("/login")
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      })
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', LoginResponse.body.token)
      .send({
        "homeTeam": 16,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      })
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.be.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal("It is not possible to create a match with two equal teams")

  })
})

describe('Teste nas rotas de matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "update")
      .resolves(); sinon
  });
    

  afterEach(() => {
    (MatchesModel.update as sinon.SinonStub).restore();
  })
  it('Verifica se é possível finalizar uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal('Finished!')
  });

})

describe('Teste nas rotas de matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "update")
      .resolves(); sinon
  });
    

  afterEach(() => {
    (MatchesModel.update as sinon.SinonStub).restore();
  })
  it('Verifica se é possível atualizar gols da partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/')
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      })
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.be.equal("Updated goals!")
  });

})
