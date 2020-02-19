import express from 'express';
import User from '../controllers/User';

import Auth from '../middleware/Auth';
import {isAdmin} from '../middleware/acoount';



const router = express.Router();

router.post('/user/signup', User.signup);
router.post('/user/login',User.login);

router.post('/user/adduser',Auth.verifyToken,isAdmin,User.addUser);

export default router;
