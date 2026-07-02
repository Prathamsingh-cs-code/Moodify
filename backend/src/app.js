const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}))

const connectToDB = require("./config/database");

app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        res.status(500).json({
            message: "Database connection failed",
            error: err.message
        });
    }
});

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

module.exports = app