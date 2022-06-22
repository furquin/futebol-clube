import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/teams';

import { Response } from 'superagent';
import TeamMock from "./mocks/TeamMock"
import TeamIdMock from "./mocks/TeamIdMock"

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes nas rotas de teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves( TeamMock as TeamModel[]);sinon
      .stub(TeamModel, "findByPk")
      .resolves( TeamIdMock as TeamModel);
  });
    

  afterEach(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findByPk as sinon.SinonStub).restore();
  })

  it('Lista times de forma correta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.body).to.be.length(5)
    expect(chaiHttpResponse.body[0]).to.be.property('id')
    expect(chaiHttpResponse.body[0]).to.be.property('teamName')
    expect(chaiHttpResponse.body[0].teamName).to.be.equals('Avaí/Kindermann')
    expect(chaiHttpResponse.body[1].teamName).to.be.equals('Bahia')
    expect(chaiHttpResponse.body[2].teamName).to.be.equals('Botafogo')
    expect(chaiHttpResponse.body[3].teamName).to.be.equals('Corinthians')
    expect(chaiHttpResponse.body[4].teamName).to.be.equals('Cruzeiro')
  });
    
  it('Lista times por id de forma correta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.body).to.be.property('id')
    expect(chaiHttpResponse.body).to.be.property('teamName')
    expect(chaiHttpResponse.body.teamName).to.be.equals('Avaí/Kindermann')
  });
});
