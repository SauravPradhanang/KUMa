const jwt = require('jsonwebtoken');

function userDecoder(req, res, next) {
    const secret = process.env.secret;

    /*const authHeader= req.headers.authorization;

    if(!authHeader){
        //return  return res.status(401).send('Authorization header is missing');
        res.render('login')
    }

    const token= authHeader.split(' ')[1];*/

    const token = req.cookies?.token;
    if (!token) {
        res.redirect('/users/login');
    }

    const decoded = jwt.verify(token, secret);

    req.userId= decoded.id;
    next();
}
module.exports=userDecoder;