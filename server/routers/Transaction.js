

import express from 'express';
import Transactions from '../controllers/Transaction';
import { isNotClient, isAccountExist } from '../middleware/acoount';
import Auth from '../middleware/Auth';
const router = express.Router();

router.post('/transactions/:accNo/debit',Auth.verifyToken,isAccountExist, isNotClient, Transactions.debitTransaction);
router.post('/transactions/:accNo/credit',Auth.verifyToken,isAccountExist, isNotClient, Transactions.creditTransaction);

export default router;


