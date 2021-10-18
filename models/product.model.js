const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    slug: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    category : {
        type: mongoose.Types.ObjectId,
        ref : "Category",
        required : true
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref : "Type",
        required : true
    },
    comment : [{
        type: mongoose.Types.ObjectId,
        ref : "Comment"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);