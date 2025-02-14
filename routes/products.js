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


  const newRating= parseInt(req.body.rating, 10);

  if(ratingExists){
    ratingExists.rating= newRating;
    await ratingExists.save();
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

  return res.send({rating: finalRating , numberOfRatings: numberOfRatings});
  
  /*res.render('product-details', {
    product: product,
    rating: ratingExists
});
*/
})


router.post(`/review/:id`, async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category');

  let reviewExists = await Review.findOne({ product: req.params.id, user: req.userId}).populate('user');
  
  const newReview= req.body.review;

  if(reviewExists){
    ratingExists.review= newReview;
    await reviewExists.save();
  }

  else{

        let reviewExists = new Review({
            product: product.id,
            user: req.userId,
            review: newReview
        })
    
        reviewExists = await reviewExists.save();
        //order = await order.populate({ path: 'orderItems', populate: { path: 'product' } });
  }

  const reviews= await Review.find({product: req.params.id, review: { $ne: null, $ne: '' } }).populate('rating').sort({ updatedAt: -1 });
   
  product.numberOfReviews=reviews.length;
  await product.save();

  res.render('product-details', {
    product: product,
    userReview: reviewExists,
    reviews: reviews
});

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

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
      const limit = parseInt(req.query.limit) || 5;
  
      // Fetch all products from the database
      const products = await Product.find({}).populate("category");
  
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
  
      // Paginate results
      //const paginatedResults = searchResults.skip(page * limit).limit(limit);
      const paginatedResults = searchResults.slice(page * limit, (page + 1) * limit);

      // Render the search results page
      res.render("product", {
        products: paginatedResults,
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
    let filter = {};
    /*if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }*/
    
    const products = await Product.find(filter).populate('category');
   

    if(!products) {
        res.status(500).json({success: false})
    } 
    //res.send(products);

    res.render('product', {products: products });
})


router.get(`/:id`, userDecoder ,async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category');
  const rating= await Rating.findOne({user: req.userId, product: req.params.id});

  console.log(req.params.id);
  res.render('product-details', {product: product, rating: rating});
})
/*
router.get(`/:id`, (req, res)=>{
  res.render('product');
})
*/
router.post(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    }
    //res.render('product', {product: product}) ;
    
    res.send(product);
})

router.post(`/`, uploadOptions.single('image'), async (req, res) =>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')

    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,// "http://localhost:3000/public/upload/image-2323232"
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})

router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)

module.exports =router;