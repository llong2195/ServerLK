const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: [
        {
            prd: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            qty: {
                type: Number,
                default: 1
            }
        }
    ],
    total : {
        type: Number,
        default : 0
    },
    price : {
        type: Number,
        default : 0
    },
    date: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Bill', billSchema);