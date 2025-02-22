function errorHandler(err, req, res, next) {

    let errors= '';

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
       //
       // res. return res.status(401).json({message: "The user is not authorized"})
        return res.render('error', {
        title: 'Access Denied!!',
        message: 'You are not authorized to access this page.'
       })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({message: err})
    }

    if (err.name==='email not present'){
        return errors= 'This email is not registererd.';
    }

    if (err.name==='incorrect password'){
        return errors= 'Your password is incorrect.';
    }

    // default to 500 server error
    return res.status(500).json(err);
}

module.exports = errorHandler;