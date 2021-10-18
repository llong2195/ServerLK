const nodemailer = require("nodemailer");

const mail = {
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
        user: "ocsen910@gmail.com",
        pass: "tnuitoietlggijje",
    }
}
const transporter = nodemailer.createTransport(mail);

module.exports = transporter;
