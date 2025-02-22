//const userDecoder = require('../helpers/user-decoder');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { Notification } = require('../models/notification');
const Fuse= require('fuse.js');
const express = require('express');
const router = express.Router();

router.get("/users-search", async (req, res) => {
    try {

      /*if(typeof req.query.q =="undefined"){const searchQuery= ""}else{const searchQuery= req.query.q};
      if(typeof currentPage == "undefined"){const page = 0}else{const page = parseInt(req.query.page) - 1}
      if(typeof limit== "undefined"){const limit= 5}else{const limit = parseInt(req.query.limit)}*/
      
  const searchQuery = req.query.q || "";
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 20;
  
      // Fetch all products from the database
      
      const selectedOption=req.query.sort;

      let users;
      users = await User.find({})

    
      const options = {
        keys: ["name", "email", "phone", "street"],
        threshold: 0.3,
        includeScore: true,
      };
  
      const fuse = new Fuse(users, options);
  
    
      const searchResults = searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : users;
 const total = searchResults.length;
  //const paginatedResults = searchResults.skip(page * limit).limit(limit);
  const paginatedResults = searchResults.slice(page * limit, (page + 1) * limit);

  // Render the search results page
  


  res.render("allUsers", {
    users: paginatedResults,
    searchQuery,
    total,
   
    currentPage: page + 1,
    totalPages: Math.ceil(total / limit),
    limit,
  });
} catch (err) {
  console.error(err);
  res.status(500).send("Internal Server Error");
}
});




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
        return;
    }

    if (req.body.action === "decline") {
        user.role= 'customer'

        let notification = new Notification({
            message: 'Your merchant applicaiton has been denied. Send again with valid documents.',
            user: user.id
        })
        await notification.save();
        res.send('depressed merchant');
        return
    }

})

module.exports = router;