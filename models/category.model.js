const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    background_img: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);