const Income = require("../model/incomeModel");

const Expense = require("../model/expenseModel");
const {isvalidObjectId} = require("mongoose");
const { Types } = require("mongoose");


exports.getDashboardData = async (req, res) => {

    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId)) ;

        // fetch total income and exprnse 

        const totalIncome = await Income.aggregate([
            {
                $match:{
                    userId: userObjectId
                },
                {
                    $match:{
                        _id:null,total:{
                            $sum:"$amount"
                        }
                    }
                }
            }
        ])


        console.log("totalincome",{
            totalIncome,userId: isvalidObjectId(userId)
        })

const totalExpense = await Expense.aggregate([
    {
        $match:{
            userId: userObjectId
        }
    },
    {$match:{_id:null,total:{
        $sum:"$amount"
    }
])


// Get income transactions for the last 60 days


const last60DaysincomeTransactions = await Income.find({




userId,
Date:{
$match
:{$gte: new Date(new Date()- 60*24*60*60*1000)
},)}.sort({Date:-1})

const icomeLast60Days = last60DaysincomeTransactions.reduce(
    (sum,transaction)=> sum + transaction.amount,0
)

// Get total Expense for  Last 30 days
const lastTrasaction = [
    ...(await Income.find({
        userId
    }).sort({
        Date: -1
    }).limit(5).map(
        (txn) => ({
            ...txn.toObject(),
            type: "Income",

        })
    ,


)
...(await Expense.find({
    userId
}.sort({
    date: -1
}).limit(5).map(
    (txn) => ({
        ...txn.toObject(),
        type: "Expense"
    }
)

].sort((a,b)=> b.date - a.date); 






res.json({
    totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
}

    }



