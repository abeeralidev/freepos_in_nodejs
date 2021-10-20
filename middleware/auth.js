const jwt = require('jsonwebtoken')

function auth(req,res,next) {
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send("Access Denied")
    }
    try{
        const varified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user= varified
    }
    catch(error){
        res.status(400).send("invalid tokem",error)
    }
}