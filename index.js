const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./route/user");
const app = express();
// Configuration
app.use(express.json());
app.use(cors);
app.use(helmet());
dotenv.config();
// Routes
    // User routes
app.use("/api/v1/user",userRoute);
// Connect to Database
const PORT = process.env.PORT || 4000;
const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server is runnin on PORT ${PORT}...`));
    } catch(error) {
        console.log(error);
    }
}
start();