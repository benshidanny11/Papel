import db from '../db/connection/query';
import {
    GET_USER_BY_ID,
    GET_ACCOUNT_DETAILS
} from '../db/queries/dataManipuration';

export const isStaffOrAdmin = (req, res, next) => {
    db.query(GET_USER_BY_ID, [req.user.id]).then(({rows}) => {
        if(rows[0]){
            if(rows[0].usertype === 'staff' || rows[0].usertype === 'admin'){
               next()
            } else {
                res.status(403).send({
                    status: 403,
                    message: "Only staff and admin can be able access this request"
                })
            }
        }
      }).catch((err) => {
        res.status(400).send({
          status: 400,
          Error: err.message
        });
      });
}

export const isAccountExist = (req, res, next) => {
  db.query(GET_ACCOUNT_DETAILS, [req.params.accNo]).then(({rows}) => {
      if(rows[0]){
        next()
      } else {
        res.status(404).send({
          status: 404,
          message: "Account Not Exists"
      })
      }
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        Error: err.message
      });
    });
}

export const isNotClient = (req, res, next) => {
  db.query(GET_USER_BY_ID, [req.user.id]).then(({rows}) => {
      if(rows[0]){
          if(rows[0].usertype != 'client'){
             next()
          } else {
              res.status(403).send({
                  status: 403,
                  message: "Client Can not make a transaction"
              })
          }
      }
    }).catch((err) => {
      res.status(400).send({
        status: 400,
        Error: err.message
      });
    });
}