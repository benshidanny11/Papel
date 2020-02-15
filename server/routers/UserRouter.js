import express from 'express';
import User from '../controllers/User';


const router = express.Router();

router.post('/user/signup', User.signup);
router.post('/user/login',User.login);

export default router;
