require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRouter = require('./routes/auth-route');
const pizzaRouter = require('./routes/pizza-router');
const dbConnect = require('./db/conn');
const orderRouter = require('./routes/order-router');
const adminRouter = require('./routes/admin-router');
const Emitter = require('events');
const { RAZORPAY_KEY_ID } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;
dbConnect();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/storage', express.static('storage'))

// Routes
app.use('/api/auth', authRouter);
app.use('/api/pizza', pizzaRouter);
app.use('/api/admin', adminRouter)
app.use('/api/order', orderRouter);

// Route for getting Razorpay key
app.get('/api/razorpay/getKey', (req, res) => {
    res.status(200).json({
        key: RAZORPAY_KEY_ID
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const eventEmitter = new Emitter();
// app.set('eventEmitter', eventEmitter);

// const io = require('./socket.js').init(server);
// io.on('connection', (socket) => {
//     console.log(socket.id);

//     socket.on('join', (orderId) => {
//         console.log(orderId);
//         socket.join(orderId);
//     });
// });

// eventEmitter.on('orderUpdated', (data) => {
//     io.to(`order_${data.orderId}`).emit('orderUpdated', data);
// });

// eventEmitter.on('orderConfirmedCart', (data) => {
//     io.to(`adminOrderPage`).emit('orderConfirmedCart', data);
// });

// eventEmitter.on('orderConfirmed', (data) => {
//     io.to('adminOrderPage').emit('orderConfirmed', data);
// });

// module.exports = { io };
