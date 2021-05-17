const { Router } = require('express');
const router = Router();
const { database } = require('../models/export')
var crypto = require('crypto');

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const users = database.users;
const Op = database.Sequelize.Op;

router.post('/signup', async (req, res) => {
    let obj = req.body;
    obj.password = crypto.createHash('sha256').update(obj.password).digest('hex')
    obj.userId = uuidv4();
    try {
        let { email } = obj;
        let found = await users.findOne({
            where: { email }
        })
        console.log(found);
        if (found) {
            res.status(500).send({ msg: "user exisis" })
        } else {
            try {
                const user = obj;
                const newUser = await users.create(user);
                res.send(newUser);


            }
            catch (err) {
                res.status(500).send({ msg: "INTERNAL ERROR!" })
            }
        }

    } catch (err) {
        res.status(500).send({ msg: "INTERNAL ERROR!" })
    }

})

router.post('/login', async (req, res) => {
    let obj = req.body;
    obj.password = crypto.createHash('sha256').update(obj.password).digest('hex');
    try {
        const loggedinUser = await users.findOne({
            where: { [Op.and]: [obj] }
        })
        if (loggedinUser) {
            req.session.userId = loggedinUser.userId;
            res.status(200).send(loggedinUser);
        } else {
            res.status(404).send({
                msg: "Signin First"
            })
        }
    } catch (err) {
        res.status(500).send({
            err, msg: "some internal err"
        });
    }
});
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send({
        msg: "nikal lawde"
    })
});
module.exports = router;