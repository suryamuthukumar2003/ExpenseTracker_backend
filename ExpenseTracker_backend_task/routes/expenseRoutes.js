const express=require('express');

const jwt=require('jsonwebtoken')

const { addExpense, getExpense, updateExpense, deleteExpense } = require('../controllers/expenseController.js');

const router=express.Router();

require('dotenv').config()
const secretkey=process.env.SECRET_KEY;


function authenticateToken(request,response,next){
    try{
        const authHeader=request.headers.authorization;
        console.log(authHeader)
        const accessToken =authHeader && authHeader.split(' ')[1];
        if(accessToken){
            jwt.verify(accessToken,secretkey,(error,userDetails)=>{
                if(error){
                    response.status(403).json({
                        "status":"forbidden",
                        "message":"access denied"
                    })
                }else{
                    next();
                }
            })
        }else{
            response.status(401).json({
                "status":"failure",
                "message":"access denied"
            })
        }
    }catch(error){
        response.status(500),json({
            "status":"error",
            "error":error
        })
    }
}

// function authenticateToken(request,response,next){
//     console.log(request.headers.authorization)
//     next();
// }

router.post('/new/:userID', authenticateToken,addExpense)

router.get('/all/:userID', authenticateToken,getExpense)

router.delete('/delete/:id', authenticateToken,deleteExpense)

router.patch('/update/:id',authenticateToken, updateExpense)


module.exports=router;