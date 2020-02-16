import db from '../db/connection/query';
import {
  CREATE_ACCOUNT,
  CHECK_IF_USER_IS_CLIENT,
  GET_ALL_ACCOUNTS_OF_USERS,
  GET_ACCOUNT_DETAILS,
  GET_ALL_BANK_ACCOUNTS
} from '../db/queries/dataManipuration';
import moment from 'moment';
import random from 'random';
class Account {

  async createAccount(req, res) {
    const accNo=random.int(10000, 99999);
    const data = [accNo, req.body.owner, req.body.type, 'pending', moment(new Date()), 0.0];
    db.query(CHECK_IF_USER_IS_CLIENT, [req.body.owner]).then((clientRes) => {
    
      if (clientRes.rows[0]) {
        db.query(CREATE_ACCOUNT, data).then((account) => {
          res.status(201).send({
            status: 201,
            massage: "You're created an account sussesfully",
            data: account.rows[0],
          });
        }).catch((err) => {
          res.status(400).send({
            status: 400,
            error: err.message
          });
        });
      } else {
        res.status(404).send({
          status: 404,
          error: "User is not client"
        });
      }
    });
  }
  async getAllAccountOwnedBySpecificUser(req, res){
    db.query(GET_ALL_ACCOUNTS_OF_USERS, [req.params.id]).then((accounts) => {
      res.status(200).send({
        status: 200,
        data: accounts.rows
      });
    });
  }
  async getSpecificAccountDetails(req, res){
    db.query(GET_ACCOUNT_DETAILS, [req.params.accNo]).then((account) => {
      if(account.rows[0]){
        res.status(200).send({
          status: 200,
          data: account.rows
        });
      } else {
        res.status(404).send({
          status: 404,
          data: {
            message: "Account not found"
          }
        });
      }
    });
  }
  async getAllBankAccounts(req, res){
    db.query(GET_ALL_BANK_ACCOUNTS, []).then((accounts) => {
      res.status(200).send({
        status: 200,
        data: accounts.rows
      });
    });
  }
}

export default new Account();