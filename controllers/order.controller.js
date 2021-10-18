
const orderModel = require('../models/bill.model');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const transporter = require('../config/transporter')
const ejs = require('ejs');
const path = require("path");

const index = async (req, res, next) => {
    try {
        const order = await orderModel.find();
        return res.status(200).json(order)
    } catch (err) {
        next(err);
    }
}
const newOrder = async (req, res, next) => {
    try {
        const newOrder = new orderModel(req.body);
        console.log(newOrder);
        newOrder.total = 0;
        newOrder.price = 0;
        if (newOrder.product.length > 0) {
            for (let item of newOrder.product) {
                prd = await productModel.findById(item.prd);
                newOrder.total += item.qty;
                newOrder.price += item.qty * prd.price;
            }
        } else {
            const err = new Error("prd is required, qty > 0")
            err.status = 204;
            throw err;
        }

        await newOrder.save().catch(err => console.log(err));
        const user = await userModel.findById(newOrder.owner);

        user.bills.push(newOrder._id);
        await user.save();
        console.log(user);
        return res.status(201).json({ order: newOrder });
    } catch (err) {
        err.status = 501;
        next(err);
    }
}
const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate([{
            path: 'product',
            populate: { path: 'prd' }
        }, { path: "owner" }]);
        return res.status(200).json({ order })
    } catch (err) {
        next(err);
    }
}
const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newOrder = req.body;
        if (newOrder.password)
            delete newOrder.password;
        await orderModel.findByIdAndUpdate(id, newOrder);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        next(err);
    }
}
const sendMail = async (req, res, next) => {
    try {
        const { user_id, order_id } = req.body;
        const user = await userModel.findById(user_id);
        const bill = await orderModel.findById(order_id).populate([{
            path: 'product',
            populate: { path: 'prd' }
        }, { path: "owner" }]);;
        console.log(bill.product);
        const html = await ejs.renderFile(
            path.join(__dirname, "../template/order.ejs"),
            {
                name: user.fname + user.lname,
                phone: user.phone,
                mail: user.email,
                totalPrice: bill.price,
                items: bill.product,
            }
        )
        await transporter.sendMail({
            to: user.email,
            from: "LK Gear",
            subject: "Xác nhận đơn hàng từ LK Gear",
            html,
        });
        return res.status(200).json({
            message: "success"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    index,
    newOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    sendMail
}