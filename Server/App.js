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
const PORT = process.env.PORT || 9080;
const env = process.env.NODE_ENV;
if(env !== 'test'){
  db.createTables['all']();
}
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
app.listen(PORT, () =>{
  console.log(`Server is started on port ${PORT} in ${process.env.NODE_ENV} mode`)
});
export default app;
