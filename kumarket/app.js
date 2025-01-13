const express= require('express');
const mongoose= require('mongoose');
const config= require('./config');
const authRoutes= require('./routes/authroutes');
const cookieParser= require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMid');

const app=express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

mongoose.connect(config.db.connection);

//routes
app.get('*', checkUser);
app.use(authRoutes);

app.listen(5000, ()=>{
    console.log("Let's roll.");
});


app.get('/', (req, res)=>{
    res.render("main");
})

app.get('/product', (req,res)=>{
    res.render("product");
})


app.get('/about', (req,res)=>{
    res.render('product-details');
})
