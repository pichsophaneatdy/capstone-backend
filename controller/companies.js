const mongoose = require("mongoose");
const User = require("../model/User");

// Endpoint for getting the list of companies
const getCompanies = async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.status(400).json({status: "Unsucessfuly", message: "No User ID is provided"});
    }
    const user = await User.findById(id);
    if(!user) {
        return res.status(400).json({status: "Unsucessfuly", message: "No User Found"});
    }
    return res.status(200).json({status: "Successfull", comapnies: user.companies});

}
// Endpoint for adding a company to the list
const addCompany = async (req,res) => {
    const {id, symbol} = req.body;
    if (!symbol) {
        return res.status(400).json({status: "Unsucessful", message: "No Symbol is provided"});
    }
    if (!id) {
        return res.status(400).json({status: "Unsucessful", message: "No User ID is provided"});
    }
    let user = await User.findById(id);
    if(!user) {
        return res.status(400).json({status: "Unsucessful", message: "No User Found"});
    }
    user.companies.push(symbol);
    user = await user.save();
    res.status(201).json({status: "Successful", message: `${symbol} is added.`});
}
// Endpoint for removing a company from the list
const removeCompany = async (req, res) => {
    const {id, symbol} = req.body;
    if (!symbol) {
        return res.status(400).json({status: "Unsucessful", message: "No Symbol is provided"});
    }
    if (!id) {
        return res.status(400).json({status: "Unsucessful", message: "No User ID is provided"});
    }
    let user = await User.findById(id);
    if(!user) {
        return res.status(400).json({status: "Unsucessful", message: "No User Found"});
    }
    let newCompanies = user.companies.filter((company) => company !== symbol);
    user.companies = newCompanies;
    user = await user.save();
    res.status(200).json({status: "Successful", message: `${symbol} is deleted.`})
}
module.exports = {getCompanies, addCompany, removeCompany};