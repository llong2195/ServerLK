const transporter = require('../config/transporter')
const ejs = require('ejs');
const path = require("path");

const index = async (req, res, next) => {
    try {
        const user = await userModel.find();
        return res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}
const sendMail = async (req, res, next) => {
    try {
        const {user , listItem, totalCart , totalItem}= req.body;

        const html = await ejs.renderFile(
            path.join(__dirname, "../template/order.ejs"),
            {
                name: user.fname + " " + user.lname,
                phone: user.phone,
                mail: user.email,
                totalPrice: totalCart,
                items: listItem,
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
    sendMail
}