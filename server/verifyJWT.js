const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req,res,next)
{
    console.log('inside verifyJWT');
    const auth = req.cookies.auth;
    if(!auth) return res.sendStatus(403);

    console.log(auth);

    jwt.verify(auth,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        console.log(decoded.name);
        req.user = decoded.name;
        next();
    })
}

module.exports = verifyJWT;