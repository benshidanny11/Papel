import db from './db';
import dotenv from 'dotenv';
dotenv.config();
db.dropTables['all']();
setTimeout(() => {
    db.createTables['all']();
}, 5000);
setTimeout(() => {
    process.exit();

}, 15000)

