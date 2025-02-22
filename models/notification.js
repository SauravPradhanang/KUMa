const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

notificationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

notificationSchema.set('toJSON', {
    virtuals: true,
});


exports.Notification = mongoose.model('Notification', notificationSchema);
