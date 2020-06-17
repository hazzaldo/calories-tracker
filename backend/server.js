const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started and listening on port: ${port}`);
})
