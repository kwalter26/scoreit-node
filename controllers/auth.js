/**
 * Created by Kyle Walter on 1/29/2017.
 */
import userController from './user';
import jwt from 'jsonwebtoken';
import config from '../config';
const exports = {};

/*
Register Function
Used to register user. Returns a jwt with inital role which limits user on front end and apis
Inputs: username,password,email,firstName,lastName,role
Outputs: error,jwt
 */
exports.register = (username, password, email,firstName,lastName,role,done) =>{
    userController.createUser(username, password, email,firstName, lastName, role, 0,(err,user)=>{
        console.log(user);
        if(err || !user){
            return done(err,null);
        }
        else{
            createToken(user,(err,token)=>{
                return done(err,token);
            })
        }
    });
};

exports.login = (username,password, done)=>{
    userController.authenticate(username,password,(err,user)=>{
       if(err) return done(err,null);
       createToken(user,(err,token)=>{
           return done(err,token);
       });
    });
};

exports.forget = (username,done)=>{
    let token = Math.random().toString().substring(2,2+config.changeToken.length)
    let currentUser = {
        username:username,
        token:token,
        tokenExpire: Date.now() + config.changeToken.maxAge
    };
    console.log(currentUser)
    userController.editUser(0,currentUser,(err,user)=>{
        if(err) return done(err);
        if(user) {
            console.log(token);
            if(user.useCell){
                // Send text
                return done(err,'cell');
            }else{
                // Send email
                return done(err,'email');
            }
        }
    });
};

exports.reset = ()=>{

};

exports.isAuthenticated = (token,role,done)=>{
    jwt.verify(token,config.jwt.secret,(err,decoded)=>{
        if(err) return done(err);
        if(!decoded) return done('Something went wrong');
        console.log(decoded._doc.role);
        if(decoded._doc.role > role){
            return done('Restricted',null)
        }
        return done(err,decoded);
    });
};

let createToken = (data,done) =>{
    console.log(data)
    jwt.sign(data,config.jwt.secret,{
        expiresIn:config.jwt.expiresIn,
        algorithm: 'HS256',
        issuer: 'ScoreIt',
        subject: 'ScoreIt Access'
    },(err,token)=>{
        if(err)return done(err,null);
        return done(err,token);
    });
};


export default exports;
