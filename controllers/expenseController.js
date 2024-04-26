const{Expense}=require('../models/Expense.js');

async function updateExpense(request, response) {
    try {
        await Expense.findByIdAndUpdate(request.params.id, {
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date,
            "userID":request.body.userID
        })
        response.status(200).json({
            "status" : "success",
            "message" : "entry updated"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "couldn\'t update entry",
            "error" : error
        })
    }
}

async function deleteExpense(request, response) {
    try {
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
            "status" : "success",
            "message" : "entry deleted"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "couldn\'t delete entry",
            "error" : error
        })
    }
}

async function getExpense(request, response) {
    try {
        const expenseDetails = await Expense.find({"userID":request.params.userID})
        response.status(200).json(expenseDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        })
    }
}

async function addExpense(request, response) {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date,
            "userID":request.params.userID
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry successfully added"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
}

module.exports={addExpense,updateExpense,deleteExpense,getExpense};