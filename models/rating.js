const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    rating:{
        type: Number,
        default: 0
    },
    ratingInt:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    
})

ratingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ratingSchema.set('toJSON', {
    virtuals: true,
});


exports.Rating = mongoose.model('Rating', ratingSchema);
