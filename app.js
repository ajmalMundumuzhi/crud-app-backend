const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
const dbConnect = require('./config/connection');
const taskRoutes = require('./routes/taskRoutes');

// MIDDLEWARE SETUP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors for front-end communication 
app.use(cors ({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint 
app.get('/', (req,res) => {
    res.json({
        message : "CRUD API is running successfully 🚀",
        endpoints : {
            'GET /api/tasks' : 'Get all tasks',
            'GET /api/tasks/:id' : 'Get task by ID',
        }
    })
})

dbConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`API available at : http://localhost:${port}`);
        console.log(`Frontend should connect to ${process.env.FRONTEND_URL}/api/tasks`);
    })
})
.catch((err) => {
    console.error("Failled to connect to the database", err);
})