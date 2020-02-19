import {
  expect
} from 'chai';
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../App';
chai.use(chaihttp);

let tokenStaff;
let tokenClient;

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

      it('Should Create admin user if data is valid', (done) => {
        chai.request(server).post('/user/signup').send({
          "firstName": "Danny1",
          "lastName": "Benshi1",
          "email": "dannykamo@gmail.com",
          "password": "Danny123",
          "type": "admin"
        }).end((req, res) => {
          expect(res).to.have.status(201);
          tokenStaff=res.body.token;
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

          tokenClient=res.body.token;

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


    describe('Add user',(done)=>{
      it('Admin can add user if provided data is valid', (done) => {
        chai.request(server)
          .post(`/user/adduser`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({
            "firstName": "Danny1",
            "lastName": "Benshi1",
            "email": "dannykamo888@gmail.com",
            "password": "Danny123",
            "usertype": "admin",
            "isAdmin":true
            }).end((req, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('User should not be added if user type is missing', (done) => {
        chai.request(server)
          .post(`/user/adduser`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({
            "firstName": "Danny1",
            "lastName": "Benshi1",
            "email": "dannykamo888@gmail.com",
            "password": "Danny123",
            "isAdmin":true
            }).end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('User should not be added by other user but only admin', (done) => {
        chai.request(server)
          .post(`/user/adduser`)
          .set('papel-access-token', `${tokenClient}`)
          .send({
            "firstName": "Danny1",
            "lastName": "Benshi1",
            "email": "dannykamo8188@gmail.com",
            "password": "Danny123",
            "usertype": "admin",
            "isAdmin":true
            }).end((req, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.have.property('message');
            expect(res.body).to.be.an('object');
            done();
          })
      });
    })


  });
});