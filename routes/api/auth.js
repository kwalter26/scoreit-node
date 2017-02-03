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
            status:1,
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
            status:1,
            error:err
        });
    });
});

router.post('/forget',(req,res)=>{
    let user = req.body;
    auth.forget(user.username,(err,type)=>{
        let success = err ? false : true;
        return res.json({
            success:success,
            type:type,
            status:0,
            error:err
        });
    });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    res.json({
        success:true,
        status:0,
        error:null
    })
});

router.get('/check',(req,res)=>{
    let token = req.cookies.jwt;
    auth.isAuthenticated(token,0,(err,data)=>{
        if(err){
            return res.json({
                success:false,
                status:0,
                error:err
            })
        }
        if(data){
            return res.json({
                success:true,
                status:data._doc.status,
                error:null
            })
        }
        return res.json({
            success:false,
            status:0,
            error:'Something went wrong'
        })
    });
});

export default router;