const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Fuse= require('fuse.js');
const userDecoder = require('../helpers/user-decoder');
const { Review } = require('../models/review');
const { Rating } = require('../models/rating');
const upload = require('../multerconfig.js');
const bodyParser = require("body-parser");




//Product.deleteMany({});


//router.use(deleteAll());

//Product.deleteAll({});


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

router.post(`/rate/:id`, userDecoder ,async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category', 'review');
  //const ratedProduct= await Product.findById(req.params.id)

  let ratingExists = await Rating.findOne({ product: req.params.id, user: req.userId}).populate('user');

  let reviewExists= await Review.findOne({product: req.params.id, user: req.userId});

  const newRating= parseInt(req.body.rating, 10);

  if(ratingExists){
    ratingExists.rating= newRating;
    await ratingExists.save();


  if(reviewExists){
    reviewExists.rating= ratingExists.id;
    await reviewExists.save();
  }

  }

  else{

        let ratingExists = new Rating({
            product: product.id,
            user: req.userId,
            rating: newRating
        })
    
        ratingExists = await ratingExists.save();
        //order = await order.populate({ path: 'orderItems', populate: { path: 'product' } });
  }
  


  const allRatings= await Rating.find({product: req.params.id, rating: { $ne: 0 }});
  const numberOfRatings= allRatings.length;
  console.log(numberOfRatings);

 let ratingSum= 0;
  allRatings.forEach(rating=>{
    ratingSum+= rating.rating
  })

  const finalRating= ratingSum/numberOfRatings;

  product.rating= finalRating;
  product.numberOfRatings= numberOfRatings;

  await product.save();

  return res.json({message: 'Rated'});
  
  /*res.render('product-details', {
    product: product,
    rating: ratingExists
});
*/
})

router.get('/upload', (req,res)=>{
  res.render('postpage');
})
router.post(`/review/:id`, async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category');

  let ratingExists = await Rating.findOne({ product: req.params.id, user: req.userId}).populate('user');

  let reviewExists = await Review.findOne({ product: req.params.id, user: req.userId}).populate('user');
  
  const newReview= req.body.review;

  if(reviewExists){
    reviewExists.review= newReview;
    

    if(ratingExists){
      reviewExists.rating= ratingExists.id;
    }
    await reviewExists.save();
  }

  else{

    

        let reviewExists = new Review({
            product: product.id,
            user: req.userId,
            review: newReview
        })
    
        if(ratingExists){
          reviewExists.rating= ratingExists.id;
        }
        reviewExists = await reviewExists.save();
        //order = await order.populate({ path: 'orderItems', populate: { path: 'product' } });
  }

  const reviews= await Review.find({product: req.params.id, review: { $ne: null, $ne: '' } }).populate(['rating', 'user']).sort({ updatedAt: -1 });
   
  product.numberOfReviews=reviews.length;
  await product.save();

  res.render('product-details', {
    product: product,
    userReview: reviewExists,
    reviews: reviews
});

})


/*
router.get('/search', (req, res)=>{
    res.render('search');
})*/
//nstead, do this:

/*
router.get("/search", async (req, res) => {
    try {
      const searchQuery = req.query.q || "";
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
  
      // Full-text search
      const products = await Product.find({
        $text: { $search: searchQuery },
      })
        .skip(page * limit)
        .limit(limit);
  
      const total = await Product.countDocuments({
        $text: { $search: searchQuery },
      });
  
      res.render("search", {
        products,
        searchQuery,
        total,
        currentPage: page + 1,
        totalPages: Math.ceil(total / limit),
      });
    }catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  */

  //router.get('/')

  router.get("/autocomplete", async (req, res) => {
    try {
      const searchQuery = req.query.q || "";
  
      // Fetch all products from the database
      const products = await Product.find({}).populate("category");
  
      // Filter products for autocomplete suggestions
      const autocompleteResults = searchQuery
        ? products
            .filter(
              (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => product.name)

          
           /* .map((product) => ({
                name: product.name, // Grab product name
                //image: product.image,
                _id: product._id // Grab product image
              }))*/
              
        : [];
        console.log(autocompleteResults);

      res.status(200).json({ autocompleteSuggestions: autocompleteResults });
    } catch (err) {
      console.error("Error in autocomplete:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  router.get("/search", async (req, res) => {
    try {

      /*if(typeof req.query.q =="undefined"){const searchQuery= ""}else{const searchQuery= req.query.q};
      if(typeof currentPage == "undefined"){const page = 0}else{const page = parseInt(req.query.page) - 1}
      if(typeof limit== "undefined"){const limit= 5}else{const limit = parseInt(req.query.limit)}*/
      
  const searchQuery = req.query.q || "";
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
  
      // Fetch all products from the database
      
      const selectedOption=req.query.sort;

      let products;
      products = await Product.find({}).populate("category")

/*
      if(selectedOption && typeof selectedOption !== "undefined"){
      
      switch(selectedOption) {
        case "default":
          products = await Product.find({}).populate("category");
            console.log("Sorting by default");
            break;
        case "price":
             products = await Product.find({}).populate("category").sort({ price: -1 }); 
            // Code for sorting by price
            console.log("Sorting by price");
            break;
        case "popularity":
           products = await Product.find({}).populate("category").sort({ rating: -1 }); 
          // Code for sorting by price
            console.log("Sorting by popularity");
            break;
        case "rating":
           products = await Product.find({}).populate("category").sort({ rating: -1 }); 
          // Code for sorting by price
            console.log("Sorting by rating");
            break;
        case "newest":
           products = await Product.find({}).populate("category").sort({ createdAt: 1 }); 
          // Code for sorting by price
            console.log("Sorting by sale");
            break;
        default:
          products = await Product.find({}).populate("category")
            console.log("No sorting option selected");
    }}else{
      products = await Product.find({}).populate("category")
    }*/
  
      // Setup Fuse.js options for fuzzy search
      const options = {
        keys: ["name", "brand", "category"],
        threshold: 0.3,
        includeScore: true,
      };
  
      const fuse = new Fuse(products, options);
  
      // Perform fuzzy search
      const searchResults = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : products;

        const autocompleteResults=[];
  
      // Calculate total count after filtering
      const total = searchResults.length;

      switch (selectedOption) {
        case "price":
            searchResults.sort((a, b) => b.price - a.price);
            break;
        case "popularity":
        case "rating": // Both use rating
            searchResults.sort((a, b) => b.rating - a.rating);
            break;
        case "newest":
            searchResults.sort((a, b) => b.createdAt - a.createdAt);
            break;
        default:
            console.log("Sorting by default (no change)");
    }

      if(selectedOption && typeof selectedOption !== "undefined"){
      
        switch(selectedOption) {
          
          case "price":
            searchResults.sort((a, b) => b.price - a.price);
              
              console.log("Sorting by price");
              break;
          case "popularity":
            searchResults.sort((a, b) => b.numberOfReviews - a.numberOfReviews);
              break;
          case "rating":
            searchResults.sort((a, b) => b.rating - a.rating);
              console.log("Sorting by rating");
              break;
          case "newest":
            searchResults.sort((a, b) => b.createdAt - a.createdAt);
              console.log("Sorting by sale");
              break;
          default:
            console.log("Sorting by default (no change)");
      }}else{
        console.log("Sorting by default (no change)");
      }

      // Paginate results
      //const paginatedResults = searchResults.skip(page * limit).limit(limit);
      const paginatedResults = searchResults.slice(page * limit, (page + 1) * limit);

      // Render the search results page
      
   

      res.render("product", {
        products: paginatedResults,
        selectedOption,
        searchQuery,
        total,
        autocompleteSuggestions: autocompleteResults,
        currentPage: page + 1,
        totalPages: Math.ceil(total / limit),
        limit,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  

   /*
  // For autocomplete: Get product names (or categories) matching the query
  const autocompleteResults = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ||product.brand.toLowerCase().includes(searchQuery.toLowerCase())
       // || product.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      ).map(product => product.name)
    : [];
*/

router.get(`/` ,async (req, res) =>{
   // let filter = {};
    /*if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }*/
    


    const products = await Product.find().populate('category');
   

    if(!products) {
        res.status(500).json({success: false})
    } 
    //res.send(products);

    res.render('product', {products: products });
})


router.get(`/:id`, userDecoder ,async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category');
  const rating= await Rating.findOne({user: req.userId, product: req.params.id});

  const reviews= await Review.find({product: req.params.id, review: { $ne: null, $ne: '' } }).populate(['rating', 'user']).sort({ updatedAt: -1 });
  let reviewExists = await Review.findOne({ product: req.params.id, user: req.userId}).populate('user');
   

  console.log(req.params.id);
  res.render('product-details', {product: product, rating: rating, reviews: reviews, userReview: reviewExists});
})
/*
router.get(`/:id`, (req, res)=>{
  res.render('product');
})
*/
router.post('/upload', upload.array('variant_img'), async (req,res)=>{
  try{
    console.log(req.body.variant_colorsize);
    console.log(req.files);
   const newProduct = new Product({
    name: req.body.product_name,
    richDescription: req.body.product_details,
    price: req.body.product_price,
    category: req.body.product_category,
    variant: req.body.variant_colorsize,
    images: req.files,
    countInStock: req.body.product_stock
   })
   if(await newProduct.save()){;
   console.log(newProduct);
   }
   res.render('postpage');
  }
  catch(err){
    console.log(`welp shit we got: ${err}`);
    res.status(500).json({ err: "Error saving data" });
  }
})

module.exports =router;