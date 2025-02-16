const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
//const cors = require('cors');
require('dotenv').config();
//require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cookieParser= require('cookie-parser');
const userBlocked= require('./helpers/user-blocked');
//const methodOverride= require('method-override');
const passport= require('passport');
const {Product} = require('./models/product');

//app.use(cors());
//app.options('*', cors())

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(authJwt());
app.use(userBlocked);
app.use(passport.initialize());
//app.use(methodOverride('_method'));

const path = require('path');

// Serve static files from the public directory
//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));



//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const orderItemsRoutes= require('./routes/order-items');
const adminRoutes= require('./routes/admin');
const { User } = require('./models/user');

//const api = process.env.API_URL;

app.use(`/categories`, categoriesRoutes);
app.use(`/products`, productsRoutes);
app.use(`/users`, usersRoutes);
app.use(`/orders`, ordersRoutes);
app.use(`/order-items`, orderItemsRoutes);
app.use(`/admin`, adminRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})

app.get('/', async (req, res)=>{
    const productsLatest = await Product.find().limit(8).sort({ createdAt: -1 });
    const productExclusive = await Product.findOne({ countInStock: { $gte: 1 } }).limit(1).sort({ price: -1 });

    res.render('main', { productsLatest, productExclusive });
})