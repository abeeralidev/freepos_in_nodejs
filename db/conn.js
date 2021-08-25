const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/freepostemptest",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true,
}).then(()=>{
    console.log("connection succesfull")
}).catch((e)=>{
    console.log("connections is unscessfull")
})