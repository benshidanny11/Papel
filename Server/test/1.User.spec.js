import {
  expect
} from 'chai';
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../App';
chai.use(chaihttp);

describe('User', () => {
  describe('User routers', () => {
    describe('Welcom user', () => {
      it('/Welome', (done) => {
        chai.request(server).get('/').end((req, res) => {
          
          expect(res).to.have.status(200);
           expect(res.body.status).to.not.equal(201)
        })
        done();
      });

    });
    describe('Signup', (req, res) => {
      it('Should Create user if data is valid', (done) => {
        chai.request(server).post('/user/signup').send({
          "firstName": "Danny1",
          "lastName": "Benshi1",
          "email": "danny9900000@gmail.com",
          "password": "Danny123",
          "type": "client"
        }).end((req, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body).to.be.an('object')
          done();
        })
      });
      it('Should return error when user alread exits', (done) => {
        chai.request(server).post('/user/signup').send({
          "firstName": "Danny1",
          "lastName": "Benshi1",
          "email": "danny9900000@gmail.com",
          "password": "Danny123",
          "type": "admin"
        }).end((req, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.be.an('object')
          done();
        })
      });
    });

    describe('Login', (req, res) => {
      it('Should Login if email and password are collect', (done) => {
        chai.request(server).post('/user/login').send({
          "email": "danny9900000@gmail.com",
          "password": "Danny123",
        }).end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.be.an('object')
          done();
        })
      });
      it('Should return error when credetial are invalid', (done) => {
        chai.request(server).post('/user/login').send({
          "email": "danny9900000@gmail.com",
          "password": "Dan34ny123",
        }).end((req, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.have.property('token');
          expect(res.body).to.be.an('object')
          done();
        })
      });
    });

  });
});