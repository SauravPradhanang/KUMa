const {User} = require('../models/user');
const {Notification}= require('../models/notification');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const errorHandler = require('../helpers/error-handler');
const userDecoder= require('../helpers/user-decoder');
const errorHandler = require('../helpers/error-handler');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
//const mongoose= require('mongoose');
//const {ObjectId}= require('mongodb');
const passport= require('../helpers/passport-google');
//const GoogleStrategy= require('passport-google-oauth20');

router.get('/google', passport.authenticate("google", {scope:["profile", "email"]}));

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res)=>{
    //const token= req.user.token;
    console.log('grabbde request');
    const token = jwt.sign(
        {
            id: req.user.id,
            isAdmin: req.user.isAdmin
        },
        process.env.secret,
        { expiresIn: '1w' }
    )

    res.cookie('token', token, {
        httpOnly: true,  // Cookie is only accessible by the server (prevents XSS attacks)
        secure: process.env.NODE_ENV === 'production',  // Set to true in production to use HTTPS
        maxAge: 60 * 60 * 24 * 7 * 1000  // Token expires in 1 week
    })
    console.log(req.user);
   res.redirect('/products/');
} )

router.get('/notifications', userDecoder ,async (req, res)=>{

    const notifications= await Notification.find({user: req.userId}).sort({createdAt: 1})

    res.render('notification', {notifications});
})

router.get('/merchant-request', (req, res)=>{
    res.render('usertomerchant');
})

router.get('/account', (req, res)=>{
   
        res.render('account.ejs');
    
})

router.post('/merchant-request', userDecoder , async (req, res)=>{
    const user = await User.findById(req.body.id);
    
    user.role='merchantRequest';
    await user.save();

})
  
router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signup', async (req,res)=>{
    console.log('it is working');
    let user = new User({
        name: req.body.username,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        /*phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,*/
    })
    user = await user.save();

   /* if(!user)
    return res.status(400).send('the user cannot be created!')*/

    let notification= new Notification({
        message: "Welcome to our website.",
        user: user.id
    })

    await notification.save();
    res.redirect('/users/account');
    //res.send(user);
})

router.post('/login', async (req,res) => {
    
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        //return res.status(400).send('The user not found');
        //const errors=errorHandler('email not present');
        const errors='The email is not registered.';
        res.status(200).json({errors});
    }

    else if(user && await bcrypt.compare(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1w'}
        )

        res.cookie('token', token, {
            httpOnly: true,  // Cookie is only accessible by the server (prevents XSS attacks)
            secure: process.env.NODE_ENV === 'production',  // Set to true in production to use HTTPS
            maxAge: 60 * 60 * 24 * 7 * 1000  // Token expires in 1 week
        })
       
        res.status(200).send({user: user._id , token: token})
        console.log('Rendering 2f template...');
       
        //res.redirect('/users/2f'); 
    } else {
      // res.status(400).send('password is wrong!');
        const errors='Your password is incorrect.';
        res.status(400).json({errors});
    }
})


router.get('/2f', (req, res)=>{
    res.render('2f');
    console.log('Cookies:', req.cookies);

})

router.post('/qrcode', userDecoder ,async (req, res)=>{

    //const secret = process.env.secret;

    /*const authHeader= req.headers.authorization;

    if(!authHeader){
        //return  return res.status(401).send('Authorization header is missing');
        res.render('login')
    }

    const token= authHeader.split(' ')[1];*/

    //const id= userDecoder();

    const id = req.userId; // Access the user ID set by the middleware
    console.log(`User ID: ${id}`);

    

    const user = await User.findById(id);
     if(user){console.log({user});}

    const qrsecret= speakeasy.generateSecret({
        name: `KUMa(${id})`
    })
    
    console.log(qrsecret);
    

    user.twoFactorSecret= qrsecret.base32;
    await user.save();

    console.log(user);

    console.log('hey');

    qrcode.toDataURL(qrsecret.otpauth_url, function(err, data){
       /* res.send(`<h1>Scan this QR Code with your Authenticator App</h1>
            <img src="${data}" />`) */
        res.render('2fQR', {data});
    })

})

router.post('/verify', userDecoder, async (req, res)=>{
    //const token= req.body.qr-verify;
    const secret = process.env.secret;

    /*const authHeader= req.headers.authorization;

    if(!authHeader){
        //return  return res.status(401).send('Authorization header is missing');
        res.render('login')
    }

    const token= authHeader.split(' ')[1];*/

    /*
    const token= req.cookies.token;
    if(!token){
        res.redirect('/users/login');
    }

    const decoded= jwt.verify(token, secret);
    const id= decoded.id;*/
    const id= req.userId;

    const user = await User.findById(id);
     console.log(user.twoFactorSecret);
     console.log(req.body.qrverify);
     console.log("Token Length:", req.body.qrverify.length);

    const verified= speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: req.body.qrverify,
    })
    if (verified) {
        
        const newToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            secret, // Use a secure secret here
            { expiresIn: '1w' }
          );

          res.cookie('token', newToken, {
            httpOnly: true,  // Cookie is only accessible by the server (prevents XSS attacks)
            secure: process.env.NODE_ENV === 'development',  // Set to true in production to use HTTPS
            maxAge: 60 * 60 * 24 * 7 * 1000  // Token expires in 1 week
        });
        res.redirect('/products/search')
          //res.status(200).send({user: user._id , token: newToken});
          
      } else {
        res.status(400).send('Invalid token. Please try again.');
      }
})

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

/*
router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})
*/

router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})




router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

router.get('/logout', (req, res)=>{
    const token= req.cookies.token;
    res.clearCookie(token);  // Clear the token cookie
    return res.status(200).send('Logged out successfully!');
})

/*
router.post('/logout', (req, res) => {
    res.clearCookie('token');  // Clear the token cookie
    res.status(200).send('Logged out successfully!');
});*/

module.exports =router;