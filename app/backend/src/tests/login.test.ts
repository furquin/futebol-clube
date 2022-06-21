import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/users';
import IUser from "./mocks/UserMock"

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes rota de login', () => {
 let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({...IUser } as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Consiga realizar login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "admin@admin.com",
            password: "secret_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.user).to.have.property('id')
      expect(chaiHttpResponse.body.user).to.have.property('username')
      expect(chaiHttpResponse.body.user).to.have.property('role')
      expect(chaiHttpResponse.body.user).to.have.property('email')
      expect(chaiHttpResponse.body.user).to.not.have.property('password')
      expect(chaiHttpResponse.body).to.have.property('token')

  });
  it('Caso não passe email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            password: "secret_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')

  });
  it('Caso não passe password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "admin@admin.com",
        })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')

  });
  it('Caso passe senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "admin@admin.com",
            password: "incorreta_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')

  });
  it('Caso passe email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "incorreto@admin.com",
            password: "incorreta_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')

  });
  it('Caso senha tenha menos que 6 caracteres', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "admin@admin.com",
            password: "admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal("\"password\" length must be at least 6 characters long\"")

  });
  it('Caso o tipo do email seja invalido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post("/login")
        .send({
            email: "admindmin.com",
            password: "secret_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message')
      expect(chaiHttpResponse.body.message).to.be.equal('"email" must be a valid email')

  });
});
