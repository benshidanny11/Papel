/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ST from '../consts/status';
import db from '../db/connection/query';
import { GET_ONE_USER } from '../db/queries/dataManipuration';

class Auth {
  constructor() {
    dotenv.config();
  }

  async verifyToken(req, res, next){
    try{
      let token =  req.headers['papel-access-token'];
      if(!token){
        return res.status(ST.BAD_REQUEST).send({
          'status' : ST.BAD_REQUEST,
          'error' : 'Token is not provided'
        });
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      
      db.query(GET_ONE_USER, [decoded.email]).then((result) => {
        if(!result.rows[0]) {
          return res.status(ST.BAD_REQUEST).send({ 
            'status':ST.BAD_REQUEST,
            'error': {'message': 'The token you provided is invalid'}
          });
        } else {
          req.user = { id:result.rows[0].id };
          next();
        }    
      });
    }catch(error){
      return res.status(ST.BAD_REQUEST).send({ 
        'status':ST.BAD_REQUEST,
        error
      });
    }
  }

  async generateToken(emal) {
    const token = jwt.sign({ email: emal }, process.env.JWT_SECRET, { expiresIn: '40d' });
    return token;
  }

  async getIdfromToken(token) {
    const email = await jwt.verify(token, process.env.JWT_SECRET).email;
    return email;
  }
}
export default new Auth();
