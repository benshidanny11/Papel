import {
  CREATE_USER_TABLE,
  CREATE_ACCOUNT_TABLE,
  CREATE_TRANSACTION_TABLE,
  DROP_USER_TABLE,
  DROP_TRANSACTION_TABLE,
  DROP_ACCOUNT_TABLE
} from '../queries/tables';
import connection from '../connection/connection';
/* istanbul ignore file */
const pool = connection.getPoolConnection();
class CREATABLE {
  constructor() {
    this.createTables = {
      all: async () => {
        pool.connect((err) => {
          if (!err) {
            pool.query(CREATE_USER_TABLE);
            pool.query(CREATE_ACCOUNT_TABLE);
            pool.query(CREATE_TRANSACTION_TABLE);
          } else {
            console.log(err.message)
          }
        })
      },
      user: async () => {
        pool.connect((err) => {
          if (!err) {
            pool.query(CREATE_USER_TABLE);
          } else {
            console.log(err.message)
          }
        })
      }
    }
    this.dropTables = {
      all: async () => {
        pool.connect((err) => {
          if (!err) {
            pool.query(DROP_USER_TABLE);
            pool.query(DROP_TRANSACTION_TABLE);
            pool.query(DROP_ACCOUNT_TABLE);
          } else {
            console.log(err.message)
          }
        })
      }
    }
  }
}
export default new CREATABLE();