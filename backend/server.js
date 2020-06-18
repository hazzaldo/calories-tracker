const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const mealsRouter = require('./routes/meals.routes');
const usersRouter = require('./routes/users.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Server established connection to MongoDB database successfully');
}); 

// Routers
app.use('/meals', mealsRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started and listening on port: ${port}`);
});
