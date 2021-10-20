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
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]

})

// RegisterSchema.methods.generateAuthToken = async function () {
//     try{
//         const token = jwt.sign({_id:this._id.toString()},"asdfghjklmnbvcxzqwertyuiopljasdfg")
//         this.token = this.tokens.concat({tokem:token})
//         await this.save();
//         return token;
//     }
//     catch(error){

//     }
// }



//genetairng tokens

RegisterSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},"asdfghjklmnbvcxzqwertyuiopljasdfg")
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        // return token;
        // res.send(token)
        console.log(token)
        return token
    }
    catch(error){
        res.send("error in jwt" +error)
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
