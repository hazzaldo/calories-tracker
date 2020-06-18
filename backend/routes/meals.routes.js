const router = require('express').Router();
const Meal = require('../models/meal.model');

router.route('/')
.get(async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
})
.post(async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const calories = Number(req.body.calories);
    const date = Date.parse(req.body.date);

    try {
        const newMealLog = new Meal({
            username: username,
            description: description,
            calories: calories,
            date: date
        });
        
        const savedMealLog = await newMealLog.save()
        res.json(`Meal log saved to DB`);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;