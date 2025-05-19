const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT
const dbConnect = require('./config/connection');


dbConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err) => {
    console.error("Failled to connect to the database", err);
})
