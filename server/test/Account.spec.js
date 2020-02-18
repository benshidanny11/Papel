import {
  expect
} from 'chai';
import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../App';
import db from '../db/migration/db'
chai.use(chaihttp);


describe('Account and Transaction', () => {
  let tokenClient;
  let tokenStaff;
  let tokenClient2;
  let accNo1;
  let accNo2;
  describe('Before tests signup and login', (req, res) => {
    it('Should sigup Client User', (done) => {
      chai.request(server).post('/user/signup').send({
        "firstName": "Danny1",
        "lastName": "Benshi1",
        "email": "danny2@gmail.com",
        "password": "Danny123",
        "type": "client"
      }).end((req, res) => {
        expect(res).to.have.status(201);
         expect(res.body).to.have.property('token');
          expect(res.body).to.be.an('object')
        done();
      })
    });
    it('Should signup admin', (done) => {
      chai.request(server).post('/user/signup').send({
        "firstName": "Danny1",
        "lastName": "Benshi1",
        "email": "danny3@gmail.com",
        "password": "Danny123",
        "type": "admin"
      }).end((req, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object')
        done();
      })
    });
    it('Should Login client', (done) => {
      chai.request(server).post('/user/login').send({
        "email": "danny2@gmail.com",
        "password": "Danny123",
      }).end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
          expect(res.body).to.be.an('object')
        tokenClient = res.body.token;
        done();
      })
    });
    it('Should Login staff', (done) => {
      chai.request(server).post('/user/login').send({
        "email": "danny3@gmail.com",
        "password": "Danny123",
      }).end((req, res) => {
        expect(res).to.have.status(200);
        tokenStaff = res.body.token;
        done();
      })
    });
     it('Should Login admin', (done) => {
      chai.request(server).post('/user/login').send({
        "email": "danny9900000@gmail.com",
        "password": "Danny123",
      }).end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object');
        tokenClient2 = res.body.token;
        done();
      })
    });
  });

  describe('Create Acount', (done) => {
    it('Should create account 1 if user is client ', (done) => {
      chai.request(server)
      .post('/client/account/create')
      .set('papel-access-token', `${tokenClient}`)
      .send(
        {
          "owner":1,
           "type":"Saving"
        }
      ).end((req, res) => {
        expect(res).to.have.status(201);
        accNo1 = res.body.data.accno;
        done();
      })
    });
    it('Should create account 2 if user is client', (done) => {
      chai.request(server)
      .post('/client/account/create')
      .set('papel-access-token', `${tokenClient}`)
      .send(
        {
          "owner":1,
           "type":"Saving"
        }
      ).end((req, res) => {
        expect(res).to.have.status(201);
        accNo2 = res.body.data.accno;
        done();
      })
    });
    it('Should return error when user is not client', (done) => {
      chai.request(server)
      .post('/client/account/create')
      .set('papel-access-token', `${tokenStaff}`)
      .send(
        {
          "owner":2,
           "type":"Saving"
        }
      ).end((req, res) => {
        expect(res).to.have.status(404);
        done();
      })
    });
  });

  describe('All accounts owned by specific user', (done) => {
    it('Should return list of accounts if user is client', (done) => {
      chai.request(server)
      .get(`/user/${2}/accounts`)
      .set('papel-access-token', `${tokenClient}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(403);
        
        done();
      })
    });
    it('Should not return list of accounts for wrong user', (done) => {
      chai.request(server)
      .get(`/user/${2}/accounts`)
      .set('papel-access-token', `${tokenStaff}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data')
        expect(res.body).to.be.an('object')
        done();
      })
    });
  })

  describe('Specific account details', () => {
    it('Should return account details', (done) => {
      chai.request(server)
      .get(`/accounts/${accNo1}`)
      .set('papel-access-token', `${tokenClient}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        done();
      })
    });
    it('Should return 404 if account does not exist', (done) => {
      chai.request(server)
      .get(`/accounts/${3546576}`)
      .set('papel-access-token', `${tokenClient}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        done();
      })
    });
  });

  describe('All accounts', () => {
    it('Should return no account if user is client', (done) => {
      chai.request(server)
      .get(`/accounts`)
      .set('papel-access-token', `${tokenClient}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        done();
      })
    });
    it('Should get all accounts if user is staff/admin ', (done) => {
      chai.request(server)
      .get(`/accounts`)
      .set('papel-access-token', `${tokenStaff}`)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        done();
      })
    });
  })

  describe('Transaction', (done) => {
    describe('Debit transaction', () => {
      it('Client should not make a transaction', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/debit`)
          .set('papel-access-token', `${tokenClient}`)
          .send({
            "accNo": accNo1,
            "amount": 5000,
            "type": "debit"
          }).end((req, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.have.property('message');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Staff can make debit transaction', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/debit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({
            "accNo": accNo1,
            "amount": 5000,
            "type": "debit"
          }).end((req, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Should return  400 if amount is not provided', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/debit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({}).end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
            done();
          })
      });
    });
  
    describe('Credit transaction', () => {
      it('Client should not make a transaction', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/credit`)
          .set('papel-access-token', `${tokenClient}`)
          .send({
            "accNo": accNo1,
            "amount": 5000,
            "type": "debit"
          }).end((req, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.have.property('message');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Staff can make credit transaction', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/credit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({
            "accNo": accNo1,
            "amount": 5000,
            "type": "debit"
          }).end((req, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Should not create account if amount is greater than balance', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/credit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({
            "accNo": accNo1,
            "amount": 10000000,
            "type": "debit"
          }).end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Should return  400 if amount is not provided', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/credit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({}).end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
            done();
          })
      });
      it('Client should not make a transaction', (done) => {
        chai.request(server)
          .post(`/transactions/${accNo1}/credit`)
          .set('papel-access-token', `${tokenStaff}`)
          .send({}).end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
            done();
          })
      });
    });
  
    describe('view History', () =>{
      it('Chould not view transaction if client is not owner of account', (done) => {
        chai.request(server)
        .get(`/transactions/${accNo1}/history`)
        .set('papel-access-token', `${tokenClient}`)
        .send({})
        .end((req, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          done();
        })
      });
      it('Client should view account transaction', (done) => {
        chai.request(server)
        .get(`/transactions/${accNo1}/history`)
        .set('papel-access-token', `${tokenClient2}`)
        .send({})
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.be.an('object');
          done();
        })
      });
    });
  })
});