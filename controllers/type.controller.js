const typeModel = require('../models/type.model');


const index = async (req, res, next) => {
    try {
        const type = await typeModel.find();
        return res.status(200).json(type)
    } catch (err) {
        next(err);
    }
}
const newType = async (req, res, next) => {
    try {
        const newType = new typeModel(req.body);
       
        console.log(newType);
        await newType.save().catch(err => console.log(err));
        return res.status(201).json({ type: newType });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
const getType = async (req, res, next) => {
    try {
        const { id } = req.params;
        const type = await typeModel.findById(id);
        return res.staus(200).json({ type })
    } catch (err) {
        next(err);
    }
}
const updateType = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newType = req.body;
        
        await typeModel.findByIdAndUpdate(id, newType);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}

const deleteType = async (req, res, next) => {
    try {
        const { id } = req.params;
        await typeModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    newType,
    getType,
    updateType,
    deleteType,
   
}