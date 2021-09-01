const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const RegisterSchema = new mongoose.Schema({
    
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    role : {
        type:String,
        required:true,
        default:"user"
    },
    lastlogindate: {
        type: Date,
        required: false,
        default: new Date()
    },
    createddate: {
        type: Date,
        required: false,
        default: new Date()
    },


})

//genetairng tokens

RegisterSchema.methods.generateAuthToken = async function(){
    try{
        // console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()},"mynamwishasnt")
        console.log(token)
        // this.token = this.tokens.concat({tokem:token})
        // await this.save();
        // return token;
    }
    catch(error){
        res.send("error in jwt" +error)
        console.log("error ins jwt"+error)
    }
}





//converting password in hash
RegisterSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        }
    next()
})


const Users = new  mongoose.model("Users",RegisterSchema);

module.exports = Users
