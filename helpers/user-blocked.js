
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');


async function userBlocked(req, res, next){

    
        const secret = process.env.secret;
    
        /*const authHeader= req.headers.authorization;
    
        if(!authHeader){
            //return  return res.status(401).send('Authorization header is missing');
            res.render('login')
        }
    
        const token= authHeader.split(' ')[1];*/

        const token = req.cookies?.token;

        if(token){
    
        const decoded = jwt.verify(token, secret);

        const user= await User.findById(decoded.id);

        if(user.status==='blocked'){
            return res.send('<h1>You are blacklisted from this website.</h1s>');
        }}
        
        next();
 
}

module.exports=userBlocked;
