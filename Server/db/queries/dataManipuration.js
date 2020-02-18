// eslint-disable-next-line import/prefer-default-export
export const CREATE_USER = `INSERT INTO
      users(firstname, lastName, email, password,createdon,usertype, isadmin)
      VALUES($1, $2, $3, $4, $5,$6, $7) returning *`;
export const GET_ALL_USERS = 'SELECT * FROM users';
export const GET_ONE_USER = 'SELECT * FROM users WHERE email = $1';
export const GET_USER_BY_ID = 'SELECT * FROM users WHERE id = $1'; 
export const LOGIN_QUERY = 'SELECT * FROM users WHERE email = $1 AND password=$2';
export const CREATE_ACCOUNT = `INSERT INTO
      account(accNo, owner, type, status,createdOn,balance)
      VALUES($1, $2, $3, $4, $5,$6) returning *`;
export const CHECK_IF_USER_IS_CLIENT = `SELECT * FROM users WHERE id = $1 AND userType='client'`;
export const GET_ALL_ACCOUNTS_OF_USERS = 'SELECT * FROM account where owner = $1';
export const GET_ACCOUNT_DETAILS = 'SELECT * FROM account where accNo = $1'
export const GET_ALL_BANK_ACCOUNTS = 'SELECT * FROM account';
export const CREATE_TRANSACTION = `INSERT INTO
transaction(accNo, type, amount, oldBalance, newBalance, createdOn)
      VALUES($1, $2, $3, $4, $5,$6) returning *`;
export const UPDATE_ACCOUNT_BALANCE = 'UPDATE account set balance = $1 where accNo = $2'
export const GET_TRANSACTION_HISTORY = 'SELECT * FROM transaction WHERE accNo=$1';
export const GET_ACCOUNT_BY_OWNER = 'SELECT * FROM account WHERE accNo=$1 AND owner=$2';