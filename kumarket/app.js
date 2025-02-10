const express= require('express');
const mongoose= require('mongoose');
const config= require('./config/config');
const authRoutes= require('./routes/authroutes');
const cookieParser= require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMid');
const ejs = require("ejs");
const Product = require("./models/productSchema")
const bodyParser = require("body-parser")
const upload = require('./config/multerconfig')

const app=express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");
//body-parser
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

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

//add product form
app.get('/upload', (req,res)=>{
  res.render('postpage');
})
app.post('/upload', upload.array('variant_img'), async (req,res)=>{
  try{
    console.log(req.body.variant_colorsize);
    console.log(req.files);
   const newProduct = new Product({
    productName: req.body.product_name,
    productDescription: req.body.product_details,
    productPrice: req.body.product_price,
    productCategory: req.body.product_category,
    productVariant: req.body.variant_colorsize,
    productImage: req.files,
    productStock: req.body.product_stock
   })
   await newProduct.save();
   console.log(newProduct);
   res.render('postpage');
  }
  catch(err){
    console.log(err);
    res.status(500).json({ err: "Error saving data" });
  }
})

app.get('/search', async (req,res)=>{
  try {
    const products = await Product.find();
    console.log(products);
    if (!products) {
      return res.status(404).send("Product not found");
    }
    res.render("product", { product:products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})


app.get('/product/:id', async (req,res)=>{
    try {
        const fproduct = await Product.findById(req.params.id);
        console.log(fproduct.productImage[0].filename);
        if (!fproduct) {
          return res.status(404).send("User not found");
        }
        res.render("product-details", { product:fproduct });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
})
