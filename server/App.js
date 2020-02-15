import 'regenerator-runtime';
import express from 'express';
import bodyParcer from 'body-parser';
import db from './db/migration/db'
import userRouter from './routers/UserRouter';
import Account from './routers/Account';
import Transaction from './routers/Transaction';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9090;
db.createTables();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/',(req,res)=>{
 res.send({
   status:200,
   message:'Welcome to papel'
 })
});
app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: false }));

app.use(userRouter);
app.use(Account);
app.use(Transaction);

const startServer = (port = '') => {
  const server = app.listen(port || PORT, () => {
    console.log(`Server is started on port ${port||PORT}`)
  });
  return server;
};
startServer();

export default startServer;
