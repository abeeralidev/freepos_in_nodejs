const Users = require("../models/user");
var express = require('express');
const bcrypt = require("bcryptjs");
require("../db/conn");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const env = require('../config/env')


var cors = require('cors');
var app = express();

app.use(cors({origin: 'http://localhost:4200'}));

// app.use(cookieParser())


exports.loginjson= async (req, res,next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
    
      const useremail = await Users.findOne({ email: email });
  
      if(email=="admin@admin.com"){
        const isMatch = await bcrypt.compare(password,useremail.password)
  
        if (isMatch==true) {
          res.status(201).render("admin/index")
    
        } else {
          res.send({status:"Invalid Email"});
        }
      }
      else{
        const isMatch = await bcrypt.compare(password,useremail.password)        
        if (isMatch==true) {
          // res.status(201).send({status:"User Logined"})

          //create and assign tokern

          var token = jwt.sign({ _id: useremail._id }, env.jwtAccessTokenSecret);
          
          // res.header('auth-token',token).send(token)


          // const uservaaaer = await jwt.verify(token,env.jwtAccessTokenSecret)
          // console.log(uservaaaer)

          res.cookie(
            "jwt",token,{
            expires:new Date(Date.now()+300000),
            httpOnly:true
          })
          res.cookie("userid",useremail._id.toString(),{
            expires:new Date(Date.now()+30000000),
            httpOnly:true
          })
          res.cookie("email",useremail.email.toString(),{
            expires:new Date(Date.now()+300000000),
            httpOnly:true,
          })
          res.cookie("role",useremail.role.toString(),{
            expires:new Date(Date.now()+300000000),
            httpOnly:true,
          })

          // res.send("Loggend in and jwt send in cookie")
          res.send({status:"Loggend in and jwt send in cookie"});
          // auth(req.res)



          // const tokennn = req.header.auth-token

          // console.log(req.header.auth-token)
          // res.send(req.header.auth-token)
          
          // res.status(201).send(useremail._id)
          
        } else {
          res.send({status:"Invalid Password"});
        }
      }
    } catch (error) {
      res.send({status:`Other Error${error}`});
    }
  };
  
  
//   function auth(req,res) {
//     const token = req.header('auth-token')
//     // var sss = token._header('auth-token')
//     if(!token){
//         return res.send("Access Denied")
//     }
//     try{
//         const varified = jwt.verify(token,env.jwtAccessTokenSecret)
//         req.user= varified
//     }
//     catch(error){
//         res.status(400).send("invalid tokem",error)
//     }
// }


  exports.getuserdata= async (req, res) => {
    

    try{
      var data = await Users.findOne({
        email: req.body.email,
      });
      if(data){
        res.send(data);
      }
      else{
        res.send({status:"false"})
      }
    }
    catch(error){
      res.send({type:"This is error",error:error})
    }
  }
  exports.signup = async (req, res) => {
    try {
      var u = await Users.findOne({
        email: req.body.email,
      });
      if (u) {
        res.send("Email already exists");
      } else {
        const registeruser = new Users({
          email: req.body.email,
          password: req.body.password,
          createdDate: new Date(),
          lastlogindate: new Date(),
          role: "user",
        });
  
        //password hash
  
        // middleware concept
  
        const token = await registeruser.generateAuthToken();
        
  
        const registerd = await registeruser.save();
      }
  
      // res.status(201).send(req.body)
      // res.send(req.body);
  
      res.render("main/account/logedin/account-overview");
      // res.status(201).render(adminindexRouter)
      // res.render(indexRouter)
      // res.send("userregisterd")
    } catch (error) {
      res.status(400);
    }
  };
  exports.signupjson = async (req, res) => {
    try {
      var u = await Users.findOne({
        email: req.body.email,
      });
      if (u) {
        res.send({status:"User Already Exists"});
      } else {
        const registeruser = new Users({
          email: req.body.email,
          password: req.body.password,
          createdDate: new Date(),
          lastlogindate: new Date(),
          role: "user",
        });  

        const tokemn = await registeruser.generateAuthToken(); 

        var tokenm = jwt.sign({ _id: registeruser._id }, env.jwtAccessTokenSecret);


        const token = await registeruser.generateAuthToken();
        
        res.cookie("jwt",token,{
          expires:new Date(Date.now()+300000),
          httpOnly:true
        })

        // res.send("Loggend in and jwt send in cookie")

        // middleware concept
  
        const registerd = await registeruser.save();
        
        res.status(201).send(
          {
            status:"User is Registerd",
            userobject:{
              registerd
            }
          }
        )
      }
  
      // res.status(201).send(req.body)
      // res.send(req.body);
  

    } catch (error) {
      res.status(400).send(error);
    }
  };
  // exports.loginjson = async (req, res) => {
  //   try {
  //     const email = req.body.email;
  //     const password = req.body.password;
  
  
  //     const useremail = await Users.findOne({ email: email });
  
  //     if(email=="admin@admin.com"){
  //       const isMatch = await bcrypt.compare(password,useremail.password)
  
  //       if (isMatch==true) {
  //         res.status(201).render("admin/index")
    
  //       } else {
  //         res.send({status:"Invalid Email"});
  //       }
  //     }
  //     else{
        
  //       const isMatch = await bcrypt.compare(password,useremail.password)
        
  //       if (isMatch==true) {
  //         res.status(201).send({status:"User Logined"})
          
  //       } else {
  //         res.send({status:"Invalid Password"});
  //       }
  //     }
  //   } catch (error) {
  //     res.status(400).send({status:"Other Error"});
  //   }
  // };
  
// login method
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;


    const useremail = await Users.findOne({ email: email });

    if(email=="admin@admin.com"){
      const isMatch = await bcrypt.compare(password,useremail.password)

      if (isMatch==true) {
        res.status(201).render("admin/index")
  
      } else {
        res.send("Email or Password is invalid");
      }
    }
    else{
      
      const isMatch = await bcrypt.compare(password,useremail.password)

      
      if (isMatch==true) {
        res.status(201).render("main/account/logedin/account-overview")
        
      } else {
        res.send("Email or Password is invalid");
      }
    }
  } catch (error) {
    res.status(400).send("Email or Password is invalid");
  }
};