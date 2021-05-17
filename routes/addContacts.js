const { Router } = require('express');
const router = Router();
const { database } = require('../models/export')
const { isAuth } = require('../middlewares/auth')
const friends = database.friends;
const Op = database.Sequelize.Op;

router.post('/', isAuth, async (req, res) => {
    let obj = req.body;
    obj.userUserId = req.session.userId;
    console.log(obj)
    try {
        const friend = obj;
        const newFriend = await friends.create(friend);
        res.status(200).send(newFriend);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
module.exports = router