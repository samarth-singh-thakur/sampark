const { Router } = require('express');
const router = Router();
const { database } = require('../models/export')
const { isAuth } = require('../middlewares/auth');
//const { friends } = require('../models/models');

const Op = database.Sequelize.Op;
const friends = database.friends;
router.get('/', isAuth, async (req, res) => {
    let { userId } = req.session
    console.log(userId)
    let userUserId = userId
    try {
        let contacts = await friends.findAll({
            where: { userUserId }
        })
        console.log(contacts)
        res.status(200).send(contacts)
    } catch (err) {
        console.log(err)
        res.send(err);
    }
})



module.exports = router