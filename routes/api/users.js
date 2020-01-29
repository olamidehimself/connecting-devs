const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravater = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/',[
    check('name', 'Name is to short').isLength({ min: 5})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const {
            name,
            email,
            password
        } = req.body;

        let user = await User.findOne({
            email
        });

        if (user) {
           return res.status(400).json({
                errors: [{
                    msg: 'User don dey database'
                }]
            });
        }

        const profile_picture = gravater.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            password,
            profile_picture
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt),

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000
        }, (err,token) => {
            if(err) throw err;
            res.json({token});
        });
        // res.send("User Routes");
    } catch (error) {
        // console.log(error)
        res.status(500).send('Server Error');
    }

    
});

module.exports = router;
