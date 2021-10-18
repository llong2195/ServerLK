const productModel = require('../models/product.model');
const commentModel = require('../models/comment.model')
const slug = require('slug');

const index = async (req, res, next) => {
    try {
        const product = await productModel.find().populate([{path: 'category'}, {path: 'type'}, {path: 'comment'}]);
        return res.status(200).json(product)
    } catch (err) {
        next(err);
    }
}
const newProduct = async (req, res, next) => {
    try {
        const newProduct = new productModel(req.body);
        if(newProduct.name){
            newProduct.slug = slug(newProduct.name)
        }else{
            const err = new Error('name is required !!')
            throw err;
        }
        console.log(newProduct);
        await newProduct.save().catch(err => console.log(err));
        return res.status(201).json({ product: newProduct });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate([{path: 'category'}, {path: 'type'}, {path: 'comment'}]);
        return res.status(200).json({ product })
    } catch (err) {
        next(err);
    }
}
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;
        if(newProduct.name){
            newProduct.slug = slug(newProduct.name)
        }
        await productModel.findByIdAndUpdate(id, newProduct);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}
const newComment = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const cmt = new commentModel(req.body);
        cmt.prd_id = id;
        console.log(cmt);
        await cmt.save();
        const product = await productModel.findById(id)
        product.comment.push(cmt.id);
        await product.save();
        const product2 = await productModel.findById(id).populate([{path: 'category'}, {path: 'type'}, {path: 'comment'}]);
        return res.status(200).json({ product  : product2})
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    newProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    newComment
}