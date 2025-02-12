const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    productVariant:[{
        type: String
    }],
    productImage:[{
        filename: String
    }],
    productDescription:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required:true
    },
    productStock:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model("productinfos", productSchema);
module.exports = Product;