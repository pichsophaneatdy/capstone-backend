const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const authPrefix = "Bearer";
    const token = authHeader && authHeader.startsWith(authPrefix) && authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({status: "Unsuccessful", message: "No token is provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.body.id = decoded.id;
        next();
    } catch(error) {
        res.status(401).json({status: "Unsuccessful", message: "You are not authorized."})
    }
}

module.exports = authUser;