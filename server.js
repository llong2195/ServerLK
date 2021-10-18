const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const morgan = require("morgan");

const database = require('./config/database');

// router
const userRouter = require('./routers/user.router.js')
const categoryRouter = require('./routers/category.router.js')
const productRouter = require('./routers/product.router.js')
const orderRouter = require('./routers/order.router.js')
const typeRouter = require('./routers/type.router.js')
const sendMailRouter = require('./routers/sendMail.router.js')

dotenv.config();
const PORT = process.env.PORT || 3000;

// database
database();
// config

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

// middleware

app.use(morgan('dev'));

// Router
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Wellcome"
    })
})

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/type", typeRouter)
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/sendMail", sendMailRouter);

// catch 404 err
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);

})


// err handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === "development" ? err : {};
    const status = err.status || 500;
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})
// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})