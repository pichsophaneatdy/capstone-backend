const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Endpoint for Register a new user
const registerUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        // Hashed the password before storing the database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({firstName: firstName, lastName: lastName,email:email, password: hashedPassword});
        // Create a new token
        const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY, {expiresIn: "2h"});
        res.status(201).json({status: "Successfully",token: token});
    } catch(error) {
        res.status(400).json({status: "Unsucessfully", message:error.message});
    }
} 
// Endpoint for Login 
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({status: "Unsucessful", message:"The email or password is missing."});
        }
        const user = await User.findOne({email: email});
        console.log(user);
        if (!user) {
            return res.status(400).json({status: "Unsuccessful", message: "The account does not exists"});
        }
        const isPwdMatched = bcrypt.compare(password, user.password);
        console.log(isPwdMatched);
        if (!isPwdMatched) {
            return res.staus(400).json({status: "Unsucessful", message: "Incorrect Password"});
        }
        const token = jwt.sign({id: user._id, firstName: user.firstName, lastName: user.lastName, companies: user.companies}, process.env.JWT_KEY, {expiresIn: "2h"});
        res.status(200).json({status: "Successful", token: token})
    } catch(error) {
        res.status(404).json({status: "Unsuccessful", message: error});
    }
}
module.exports = {registerUser, login};