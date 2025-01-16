const express= require('express');
const app=express();
const mongoose= require('mongoose');
const config= require('./config');


//mongoose.connect(config.db.connection);

app.set("view engine", "ejs");
app.use(express.static("public"));

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
