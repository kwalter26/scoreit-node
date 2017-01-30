/**
 * Created by Kyle Walter on 1/29/2017.
 */
import express from 'express';
import config from '../../config';
const router = express.Router();
import auth from '../../controllers/auth';

router.post('/register',(req,res)=>{
    let user = req.body;
    auth.register(user.username,user.password,user.email,user.firstName,user.lastName,user.role,(err,token)=>{
        let success = false;
        if(!err) success = true;
        res.cookie('jwt',token,{maxAge:config.jwt.expiresIn * 1000,httpOnly:true});
        res.json({
            success:success,
            auth:true,
            status:0,
            error:err
       });
    });
});

router.post('/login',(req,res)=>{
    auth.login(req.body.username,req.body.password,(err,token)=>{
        let success = false;
        if(!err) success = true;
        res.cookie('jwt',token,{maxAge:config.jwt.expiresIn * 1000,httpOnly:true});
        res.json({
            success:success,
            auth:true,
            status:0,
            error:err
        });
    });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    res.json({
        success:true,
        auth:false,
        status:null,
        error:null
    })
});

router.get('/check',(req,res)=>{
    let token = req.cookies.jwt;
    auth.isAuthenticated(token,(err,data)=>{
        console.log(Date.now())
        if(err){
            res.json({
                success:true,
                auth:false,
                status:null,
                error:null
            })
        }
        if(data){
            res.json({
                success:true,
                auth:true,
                status:data.status,
                error:null
            })
        }


    });
});

export default router;