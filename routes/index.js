import express from 'express';
const router =  express.Router();

import auth from './api/auth';

router.use('/api/auth',auth);

router.get('/',(req,res)=>{
    res.render('index');
});

export default router;
