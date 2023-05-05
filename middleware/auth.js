const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    
    const authHeader = req.params['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({status: "Unsuccessful", message: "No token is provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KET);
        
    } catch(error) {
        res.status(401).json({status: "Unsuccessful", message: "You are not authorized."})
    }
    
    

}