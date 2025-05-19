const mongoose = require('mongoose');

async function connectDB () {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'crudDB',
    })

    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection failed");
    })
}

module.exports = connectDB;
