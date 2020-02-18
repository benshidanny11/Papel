import moment from 'moment';
import db from '../db/connection/query';
import { CREATE_USER ,LOGIN_QUERY} from '../db/queries/dataManipuration';
import Auth from '../middleware/Auth';

class User {
  async signup(req, res) {
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      moment(new Date()).toString(),
      req.body.type,
      false,
    ];
    Auth.generateToken(req.body.email).then((token)=>{
      db.query(CREATE_USER, values).then((user) => {
        res.status(201).send({
          token:token,
          status: 201,
          message:"You're signed up sussesfully",
          data: {
            firstName:user.rows[0].firstname,
            lastName:user.rows[0].lastname,
            email:user.rows[0].email
          },
        });
      }).catch((err) => {
        res.status(400).send({
          status: 400,
          Error:err.message
        });
      });
    });
  }
  async login(req,res){
    Auth.generateToken(req.body.email).then((token)=>{
      db.query(LOGIN_QUERY,[req.body.email,req.body.password]).then((user)=>{
       if(user.rows[0]){
        res.status(200).send({
          token:token,
          status: 200,
          message:"You're logged in sussesfully",
           data: {
            firstName:user.rows[0].firstname,
            lastName:user.rows[0].lastname,
            email:user.rows[0].email
          },
        });
       }else{
        res.status(400).send({
          status: 400,
          error:"Invalid login"
        });
       }
      });
    });
  }
}
export default new User();
