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

exports.isAuthenticated = (token,done)=>{
    jwt.verify(token,config.jwt.secret,(err,data)=>{
        return done(err,data);
    });
};

let createToken = (data,done) =>{
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
