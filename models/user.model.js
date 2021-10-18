const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname :{
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
    },
    password : {
        type: String,
        required: true
    },
    bills : [{
        type: mongoose.Types.ObjectId,
        ref : "Bill"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);