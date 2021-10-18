const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    prd_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    content : {
        type: String,
        required : true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);