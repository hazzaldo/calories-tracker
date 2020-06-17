const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true }, 
    calories: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;