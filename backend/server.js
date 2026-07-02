require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const app = require("./src/app")
const connectToDB = require("./src/config/database");


connectToDB();

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}

module.exports = app;