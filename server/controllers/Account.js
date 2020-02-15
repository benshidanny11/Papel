import db from '../db/connection/query';
import {
  CREATE_ACCOUNT,
  CHECK_IF_USER_IS_CLIENT,
  GET_ALL_ACCOUNTS_OF_USERS,
  GET_ACCOUNT_DETAILS,
  GET_ALL_BANK_ACCOUNTS
} from '../db/queries/dataManipuration';
import moment from 'moment';
class Account {

  async createAccount(req, res) {
    const data = [req.body.accNo, req.body.owner, req.body.type, 'pending', moment(new Date()), 0.0];
    db.query(CHECK_IF_USER_IS_CLIENT, [req.body.owner]).then((clientRes) => {
      if (clientRes.rows[0]) {
        db.query(CREATE_ACCOUNT, data).then((account) => {
          res.status(201).send({
            status: 201,
            Message: "You're created an account sussesfully",
            data: account.rows[0],
          });
        }).catch((err) => {
          res.status(400).send({
            status: 400,
            Error: err.message
          });
        });
      } else {
        res.status(404).send({
          status: 404,
          Error: "User is not client"
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
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        Error: err.message
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
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        Error: err.message
      });
    });
  }
  async getAllBankAccounts(req, res){
    db.query(GET_ALL_BANK_ACCOUNTS, []).then((accounts) => {
      res.status(200).send({
        status: 200,
        data: accounts.rows
      });
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        Error: err.message
      });
    });
  }
}

export default new Account();