const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./route/user");
const companiesRoute = require("./route/companies");
const app = express();
const authUser = require("./middleware/auth");
// Configuration
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5500'}));
app.use(helmet());
dotenv.config();
// Routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/companies", authUser, companiesRoute);
// Connect to Database
const PORT = process.env.PORT || 5500;
const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`));
    } catch(error) {
        console.log(error);
    }
}
start();