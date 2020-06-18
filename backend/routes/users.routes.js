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
.post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
    .then(() => res.json('Username saved to DB'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;