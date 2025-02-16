const { expressjwt: expressJwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    //const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        
        getToken: (req)=>{
            if (req.cookies && req.cookies.token){
                return req.cookies.token;
            }
            return null;e
        },
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `/users/login`,
            `/users/signup`,
            `/users/account`,
            {url: /\/users\/qrcode(.*)/ },
            {url: /\/users\/verify(.*)/ },
            `/`,
            
            {url: /\/users\/google(.*)/ }
        ]
        
    })
}

async function isRevoked(req, token) {
    // Check if the user is attempting to access an admin-only route
    /*if (req.originalUrl.includes('/admin') && !payload.isAdmin) {
        // If the user is not an admin and tries to access an admin route, revoke access
        return done(null, true);
    }*/

    // If it's not an admin route, or the user is an admin, don't revoke the access
    if (req.originalUrl.includes('/admin') && !token.payload.isAdmin) {
        console.log('Token is revoked.');
        // Return true to revoke access
        return true;
    }

    console.log('Token is valid.');
    // Return false to allow access
    return false;
}



module.exports = authJwt