const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create a new user
const createUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password, companies} = req.body;
        // Hashed the password before storing the database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)
        const newUser = await User.create({firstName, lastName,email, password: hashedPassword, companies});
    } catch(error) {
        res.status(400).json({status: "Unsucessfully", message:error});
    }
} 

module.exports = {createUser};