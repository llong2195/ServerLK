const categoryModel = require('../models/category.model');
const slug = require('slug');

const index = async (req, res, next) => {
    try {
        const category = await categoryModel.find();
        return res.status(200).json({ category })
    } catch (err) {
        next(err);
    }
}
const newCategory = async (req, res, next) => {
    try {
        const newCategory = new categoryModel(req.body);
        if (newCategory.name) {
            newCategory.slug = slug(newCategory.name);
        } else {
            const err = new Error("name is required!");
            throw err;
        }
        console.log(newCategory);
        await newCategory.save();
        return res.status(201).json({ category: newCategory });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);
        console.log(category.slug);
        return res.status(200).json({ category })
    } catch (err) {
        next(err);
    }
}
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newCategory = req.body;
        if (newCategory.name) {
            newCategory.slug = slug(newCategory.name);
        }
        await categoryModel.findByIdAndUpdate(id, newCategory);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}


module.exports = {
    index,
    newCategory,
    getCategory,
    updateCategory,
    deleteCategory,
}