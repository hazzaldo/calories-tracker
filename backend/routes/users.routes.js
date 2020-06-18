const router = require('express').Router();
const User = require('../models/user.model');

router.route('/')
.get( async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
})
.post(async (req, res) => {
    const username = req.body.username;
    try {
        const newUser = new User({username});
        const savedUser = await newUser.save();
        res.json(`Username ${savedUser.username} saved to DB`);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    } 
});

module.exports = router;