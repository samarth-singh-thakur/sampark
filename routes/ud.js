const { Router } = require('express');
const router = Router();
const { database } = require('../models/export');
const { isAuth } = require('../middlewares/auth')
const Op = database.Sequelize.Op;

router.delete('/delete', isAuth, async (req, res) => {
    const { userId } = req.session;
    const userUserId = userId;
    const { firstName, lastName, phoneNumber } = req.body;
    console.log(firstName)
    try {
        await database.friends.destroy({
            where: { [Op.and]: [{ firstName, lastName, phoneNumber, userUserId }] }
        })
        res.redirect('/allcontacts')

    } catch (err) {
        console.log(err)
        res.send("fuckup")
    }
})


module.exports = router