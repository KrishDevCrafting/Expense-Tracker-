// Add Income Source User
const User = require("../models/User");
const Income = require("../models/income");

exports.addIncome = async (req, res) => {


const   userId = req.user._id;
try{
    const {icon,source,amount}= req.body;
    // Validation: check for missing fields
    if(!source ||!amount ||!data){
        return res.status(400).json({  message:"All fields are required"});
    }

    const newIncome = new Income({
        userId,
        icon,
        source,     
        amount,
        date: new Date(data)
    })

    await newIncome.save();
    res.status(200).json(newIncome)  
}catch(err){
    res.status(500).json({message:"server error"})
}






};
// getAllIncome
exports.getAllIncome = async (req, res) => {};
// deleteIncome
exports.deleteIncome = async (req, res) => {};
// downloadIncomeExcel
exports.downloadIncomeExcel = async (req, res) => {};
