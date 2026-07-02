const mongoose = require("mongoose");

let cachedDb = null;

async function connectToDB() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    try {
        console.log("Connecting to MongoDB...");
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to MongoDB successfully");
        cachedDb = db;
        return db;
    } catch (err) {
        console.error("Database connection error: ", err);
        throw err;
    }
}

module.exports = connectToDB;