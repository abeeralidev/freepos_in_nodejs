const Users = require("../models/user");
const questions = require("../models/questions");
const contactus = require("../models/contact");
const multiparty = require('multiparty');
const fse = require('fs-extra');
var express = require('express');
const bcrypt = require("bcryptjs");
require("../db/conn");




var cors = require('cors');
var app = express();

app.use(cors({origin: 'http://localhost:4200'}));



  



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

//contact us
exports.contactus = async (req, res) => {
    try {
      var contactus = new Contact({
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        message: req.body.message,
      });
      var contacted = await contactus.save();
      res.status(201).send(req.body);
      // res.render(indexRouter)
      // res.send("userregisterd")
      // app.use('/admin')
      res.send(res.body);
    } catch (error) {
      res.status(400);
    }
  };
  
  //search question
  exports.s = async (req, res) => {
    var u = await questions.findOne({
      questionstring: req.body.questionstring,
    });
    if (u) {
      res.status(201).send(u);
    } else {
      res.status(201).send("questions not found");
    }
  };
  
  exports.getallusers = async (req, res) => {
    const bearerHeader = req.headers['auth-token'];

    console.log(JSON.stringify(req.headers));

    const token = req.header('auth-token')
    // var sss = token._header('auth-token')
    if(!token){
        return res.send("Access Denied")
    }

    var nnn = Number(req.params.slug)
    var d=req.params.slug
    var data = await Users.find();
    var jsonstring=JSON.stringify(data)
    res.send({data:jsonstring});
  };
  
  exports.getalluserssorts = async (req, res) => {
    var nnn = Number(req.params.slug)
    const byyy = req.params.by
    var data = await Users.find().sort({byyy :nnn});
    var jsonstring=JSON.stringify(data)
    res.send({data:jsonstring});
  };
  
  
  exports.getalluserssortsbyrole = async (req, res) => {
    var nnn = Number(req.params.slug)
    var data = await Users.find().sort({"role":nnn});
    var jsonstring=JSON.stringify(data)
    res.send({data:jsonstring});
  };
  
  exports.getallusersbyrole = async (req, res) => {
    var data = await Users.find({
      role: "user",
    });
    var jsonstring=JSON.stringify(data)
    res.send({data:jsonstring});
  };
  exports.getalladmins = async (req, res) => {
    var data = await Users.find({
      role: "admin",
    });
    var jsonstring=JSON.stringify(data)
    res.send({data:jsonstring});
  };
  