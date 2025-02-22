const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },  
   
    rating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        },
}, { timestamps: true })

reviewSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

reviewSchema.set('toJSON', {
    virtuals: true,
});


exports.Review = mongoose.model('Review', reviewSchema);
