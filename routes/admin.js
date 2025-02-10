//const userDecoder = require('../helpers/user-decoder');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { Notification } = require('../models/notification');

const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('allUsers', {users});
})

router.post('/users-flagging', async (req, res) => {
    const user = await User.findById(req.body.id);

    if (req.body.action === "warning") {

        let notification = new Notification({
            message: 'Misconduct will not be tolerated in the future. This is your final warning!',
            user: user.id
        })
        await notification.save();

        res.send('warned');
        return
    }

    if (req.body.action === "blacklist") {

        let notification = new Notification({
            message: 'Your account has been banned indefinitely.',
            user: user.id
        })
        await notification.save();

        user.status = 'blocked';
        await user.save();
        res.send('blacklisted user');
        return
    }

    if(req.body.action==="remove-ban"){

        user.status='allowed';
        await user.save();

        let notification = new Notification({
            message: 'Your ban has been lifted. But the next time, it will be permanent.',
            user: user.id
        })
        await notification.save();

        res.send('lifted ban!');
        return
    }

})

router.get('/merchant', async (req, res) => {

    const merchants = await User.find({ role: 'merchant' });
    res.render('merchants', {merchants});
})

router.get('orders', async (req, res) => {
    const orders = await Order.find({ status: 'Delivered' });
    res.render('ordersDelivered', {orders});
})

router.get('/merchant-requests', async (req, res) => {
    const merchantsPending = await User.find({ role: 'merchantRequest' });
    res.render('pendingMerchants', {merchantsPending});
})

router.get('/orders-requests', async (req, res) => {
   // const ordersPending = await Order.find({ status: 'Pending' }).populate({ path: 'orderItems', path: 'user' })//, select: { name: 1 }});
    const ordersPending= await Order.find({status: 'Pending' }).sort({ dateOrdered: 1 }).populate({ path: 'orderItems', populate:{path: 'product'}}).populate({path: 'user'});

    res.render('pendingOrders', {ordersPending});
})


router.post('/order-requests', async (req, res) => {

    console.log(req.body.id);
    const order = await Order.findById(req.body.id).populate({ path: 'user' });
    console.log(order);
    const user = await User.findById(order.user.id);

    if (req.body.action === "delivered") {
        order.status = "Delivered";
        await order.save();


        let notification = new Notification({
            message: 'Your latest order has been sent. It should arrive soon.',
            user: user.id
        })
        await notification.save();
        res.send('done order');
        return
    }
    else {
        /*let notification= new Notification({
            message:'Your order ',
            user: user.id
        })
        await notification.save();*/
        res.send('order error');
        return
    }

})

router.post('/merchant-requests', async (req, res) => {

    //const user= await User.findById(req.userId);
    const user = await User.findById(req.body.id);

    if (req.body.action === "accept") {
        user.role = 'merchant';
        await user.save();


        let notification = new Notification({
            message: 'Your merchant applicaiton has been approved.',
            user: user.id
        })
        await notification.save();

        res.send('done merchant');
    }

    if (req.body.action === "decline") {

        let notification = new Notification({
            message: 'Your merchant applicaiton has been denied. Send again with valid documents.',
            user: user.id
        })
        await notification.save();
        res.send('depressed merchant');
    }

})

module.exports = router;