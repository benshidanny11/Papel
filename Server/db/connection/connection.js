import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import config from './configFile';
class Connection {
  constructor() {
    this.getPoolConnection = () => new Pool(config[process.env.NODE_ENV]);
  }
}
export default new Connection();