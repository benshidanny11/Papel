import {
  CREATE_USER_TABLE,
  CREATE_ACCOUNT_TABLE,
  CREATE_TRANSACTION_TABLE
} from '../queries/tables';
import connection from '../connection/connection';

const pool = connection.getPoolConnection();
class CREATABLE {
  constructor() {
    this.createTables = async () => {
      pool.connect((err) => {
        if (!err) {
          pool.query(CREATE_USER_TABLE);
          pool.query(CREATE_ACCOUNT_TABLE);
          pool.query(CREATE_TRANSACTION_TABLE);
        } else {
          console.log(err.message)
        }
      });
      return true;
    };
  }
}
export default new CREATABLE();