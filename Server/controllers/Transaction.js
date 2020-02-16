import db from '../db/connection/query';
import {
  CREATE_TRANSACTION,
  GET_ACCOUNT_DETAILS,
  UPDATE_ACCOUNT_BALANCE,
  GET_TRANSACTION_HISTORY
} from '../db/queries/dataManipuration';
import moment from 'moment';
class Transaction {
  async debitTransaction(req, res) {
    db.query(GET_ACCOUNT_DETAILS, [req.body.accNo]).then((account) => {
      console.log(account.rows)
      const data = [req.body.accNo, req.body.type, req.body.amount, account.rows[0].balance,account.rows[0].balance + req.body.amount, moment(new Date())];
      db.query(CREATE_TRANSACTION, data).then(() => {
        db.query(UPDATE_ACCOUNT_BALANCE, [account.rows[0].balance + req.body.amount, req.body.accNo]).then(() => {
          res.status(201).send({
            status: 201,
            message: "You have created a transaction sussesfully",
            data: account.rows[0],
          });
        })
      });
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        error: err.message
      });
    });
  }

  async creditTransaction(req, res) {
    db.query(GET_ACCOUNT_DETAILS, [req.body.accNo]).then((account) => {
      if(account.rows[0].balance >= req.body.amount){
        const data = [req.body.accNo, req.body.type, req.body.amount, account.rows[0].balance,account.rows[0].balance - req.body.amount, moment(new Date())];
      db.query(CREATE_TRANSACTION, data).then((transaction) => {

        db.query(UPDATE_ACCOUNT_BALANCE, [account.rows[0].balance + req.body.amount, req.body.accNo]).then(() => {
          res.status(201).send({
            status: 201,
            message: "You have created a transaction sussesfully",
            data: transaction.rows[0],
          });
        })
      });
      }  else {
        res.status(200).send({
          status: 200,
          message: "Insuficient Balance",
        });
      }
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        error: err.message
      });
    });
  }

  async viewHistory(req,res){
    db.query(GET_TRANSACTION_HISTORY,[req.params.accNo]).then((historyTran)=>{
      if(historyTran.rows[0]){
       res.status(200).send({
         status: 200,
         message:'Transaction found',
         data: historyTran.rows
       });
      }else{
       res.status(200).send({
         status: 200,
         message: "No history found!",
       });
      }
    }).catch((err) => {
     res.status(400).send({
       status: 400,
       error: err.message
     });
   });
   }

}

export default new Transaction();