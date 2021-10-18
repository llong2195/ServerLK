const md5 = require('md5')
const userModel = require('../models/user.model');


const index = async (req, res, next) => {
    try {
        const user = await userModel.find();
        return res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}
const newUser = async (req, res, next) => {
    try {
        const newUser = new userModel(req.body);
        if (!req.body.password) {
            const error = new Error('Password is required');
            error.status = 501;
            throw error;
        }
        newUser.password = md5(md5(newUser.password));
        console.log(newUser);
        await newUser.save().catch(err => console.log(err));
        return res.status(201).json({ user: newUser });
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        return res.status(200).json({ user })
    } catch (err) {
        next(err);
    }
}
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newUser = req.body;
        if (newUser.password)
            delete newUser.password;
        await userModel.findByIdAndUpdate(id, newUser);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}
const changePassUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { oldPassword, newPassword } = req.body;
        oldPassword = md5(md5(oldPassword));
        newPassword = md5(md5(newPassword));
        console.log(oldPassword);
        if (oldPassword && newPassword) {
            const user = await userModel.findById(id);
            console.log(user);
            if (user.password === oldPassword) {
                user.password = newPassword;
                await user.save();
                return res.status(200).json({
                    message: "success"
                })
            } else {
                return res.status(200).json({
                    message: "pls check your oldPassword"
                })
            }
        }
        else {
            throw new Error("pls check your oldPass and newPass")
        }
    } catch (err) {
        next(err);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}
const getUserBill = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userBill = await userModel.findById(id).populate("bills");
        delete userBill.password;
        return res.status(200).json({ user: userBill })
    } catch (err) {
        next(err);
    }
}
const login = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { userName, pass } = req.body;
        pass = await md5(md5(pass));
        console.log(pass);
        const user = await userModel.find({
            $and: [
                { $or: [{ phone: userName }, { email: userName }] },
                { password: pass }
            ]
        });
        console.log(user);
        if (user.length > 0) {
            return res.status(200).json({
                "status": true,
                "userLogin": user[0]
            })
        } else {
            return res.status(200).json({
                "status": false,
                message: "pls check your oldPassword"
            })
        }
    } catch (err) {
        next(err);
    }
}
module.exports = {
    index,
    newUser,
    getUser,
    updateUser,
    changePassUser,
    deleteUser,
    getUserBill,
    login
}