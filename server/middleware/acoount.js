import db from '../db/connection/query';
import {
  GET_USER_BY_ID,
  GET_ACCOUNT_DETAILS,
  GET_ONE_USER,
  GET_ACCOUNT_BY_OWNER
} from '../db/queries/dataManipuration';

export const isStaffOrAdmin = (req, res, next) => {
  db.query(GET_USER_BY_ID, [req.user.id]).then(({
    rows
  }) => {
    if (rows[0].usertype === 'staff' || rows[0].usertype === 'admin') {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: "Only staff and admin can be able access this request"
      })
    }
  });
}

export const isAccountExist = (req, res, next) => {
  db.query(GET_ACCOUNT_DETAILS, [req.params.accNo]).then(({
    rows
  }) => {
    if (rows[0]) {
      next()
    } else {
      res.status(404).send({
        status: 404,
        message: "Account Not Exists"
      })
    }
  })
}

export const isNotClient = (req, res, next) => {
  
  db.query(GET_USER_BY_ID, [req.user.id]).then(({
    rows
  }) => {
    if (rows[0].usertype != 'client') {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: "Client Can not make a transaction"
      })
    }
  })

}

export const isAdmin = (req, res, next) => {
  
  db.query(GET_USER_BY_ID, [req.user.id]).then(({
    rows
  }) => {
    if (rows[0].usertype == 'admin') {
      next()
    } else {
      res.status(403).send({
        status: 403,
        message: "User is not admin"
      })
    }
  })

}
export const isClientAccountOwner = (req, res, next) => {
  db.query(GET_USER_BY_ID, [req.user.id]).then(({
    rows
  }) => {
    if (rows[0]) {
      db.query(GET_ACCOUNT_BY_OWNER, [req.params.accNo, rows[0].id]).then((accoutRes) => {
        if (accoutRes.rows[0]) {
          next()
        } else {
          res.status(403).send({
            status: 403,
            message: "Client may not be the owner of account!"
          });
        }
      });
    }
  });
}