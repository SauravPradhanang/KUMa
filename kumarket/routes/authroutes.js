const Router= require('express');
const User= require("../models/user");
const jwt= require('jsonwebtoken');

//error handler
const errorHandler=(err)=>{
    console.log(err.message, err.code);

    let errors= {email: '', password: ''}

    //incorrect email and password

    if (err.message==='incorrect email'){
        errors.email= 'the email is not registererd.';
    }

    if (err.message==='incorrect password'){
        errors.password= 'the password is incorrect.';
    }

    //duplicate error code

    if (err.code=== 11000){
        errors.email='that email already exists. choose a unique one.';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach((properties)=>{
            errors[properties.path]= properties.message;
        })
    }

    return errors;

}

const tokenMaxAge= 7*24*60*60;
const createToken= (id)=>{
    return jwt.sign({id}, 'aganazzar999', {
        expiresIn: tokenMaxAge
    })
}

const router= Router();

router.get('/signup', (req, res)=>{
    res.render('signup');
});
router.get('/login', (req, res)=>{
    res.render('login');
});
router.post('/signup', async (req, res)=>{
    
    const {email, password}= req.body;

    try{
        const user= await User.create({email, password});
        const token= createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: tokenMaxAge});
        res.status(201).json({user: user._id});
        console.log('signup worked');
    }
    catch(err){
        const errors= errorHandler(err);
        res.status(400).json({errors});
        console.log({errors});
    }
    
});
router.post('/login',async (req, res)=>{
    const {email, password}= req.body;
    try{
        const user= await User.login(email, password);
        const token= createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: tokenMaxAge});
        res.status(200).json({user: user._id});
        console.log('login works');
    }
    catch(err){
        const errors= errorHandler(err);
        res.status(400).json({errors});
    }
});

module.exports= router;
