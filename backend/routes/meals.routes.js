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

router.route('/:id')
.get(async (req, res) => {
    try {
        const foundMealLog = await Meal.findById(req.params.id);
        res.json(foundMealLog);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
})
.delete(async (req, res) => {
    try {
        const deletedMealLog = await Meal.findByIdAndDelete(req.params.id);
        res.json(`Meal log ${deletedMealLog.id} deleted successfully`)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
})
.put(async (req, res) => {
    const {username, description, calories, date} = req.body
    let foundMealLog = {};
    try {
        foundMealLog = await Meal.findById(req.params.id);
        foundMealLog.username = username;
        foundMealLog.description = description;
        foundMealLog.calories = Number(calories);
        foundMealLog.date = Date.parse(date);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

    try {
        const savedMealLog = await foundMealLog.save();
        res.json(`Meal log ${savedMealLog.id} updated.`);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;