/**
 * git clone <link>
 * 
 * git add .
 * git commit -m "message"
 * git push
 * 
 * git config --global user.name '<github username>'
 * git config --global user.email <github emailID>
 */

/**
 * Functionalities of the application
 * End points
 * Express application
 * DB connection
 * Schema definition and creating a model
 */

/**
 * CRUD operations
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (patch)
 * deleting entries -> /delete-expense (delete)
 * 
 * adding a new user -> /add-user (post)
 * validating existing user -> /login (post)
 * 
 * monthly analysis
 */

/**
 * Database - Expense Tracker
 * Collections
 *      i) ExpenseDetails
 *          - amount (number)
 *          - category (string)
 *          - date (string)
 *      ii) UserDetails
 *          - username
 *          - emailID
 *          - password
 */

// const bodyParser = require('body-parser')//middle ware
// const cors = require('cors')//middle ware
// const express = require('express')
// const mongoose = require('mongoose')
// const jwt=require('jsonwebtoken');
// const { Expense, User } = require('./schema.js')

// const expenseRoutes=require('./routes/expenseRoutes.js');
// const userRoutes=require('./routes/userRoutes.js');

// const app = express()
// app.use(bodyParser.json())
// app.use(cors())

// app.use(expenseRoutes)
// app.use(userRoutes)

// const secretkey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ";

// function generateToken(userDetails){
//     return jwt.sign(userDetails,secretkey);
// }

// function authenticateToken(request,response,next){
//     try{
//         const authHeader=request.headers.authorization;
//         const accessToken =authHeader && authHeader.split(' ')[1];
//         if(accessToken){
//             jwt.verify(accessToken,secretkey,(error,userDetails)=>{
//                 if(error){
//                     response.status(403).json({
//                         "status":"forbidden",
//                         "message":"access denied"
//                     })
//                 }else{
//                     next();
//                 }
//             })
//         }else{
//             response.status(401).json({
//                 "status":"failure",
//                 "message":"access denied"
//             })
//         }
//     }catch(error){
//         response.status(500),json({
//             "status":"failure",
//             "error":error
//         })
//     }
// }
// async function connectToDb() {
//     try {
//         await mongoose.connect('mongodb+srv://suryamk2003:suryamk2003@cluster0.la65aby.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
//         console.log("DB connection established :)")

//         const port = process.env.PORT || 8000
//         app.listen(port, function() {
//             console.log(`Listening on port ${port}...`)
//         })
//     } catch(error) {
//         console.log(error)
//         console.log('Couldn\'t establish DB connection :(')
//     }
// }
// connectToDb()

// app.post('/expense/new/:userID', authenticateToken,async function(request, response) {
//     try {
//         await Expense.create({
//             "amount": request.body.amount,
//             "category": request.body.category,
//             "date": request.body.date,
//             "userID":request.params.userID
//         })
//         response.status(201).json({
//             "status" : "success",
//             "message" : "entry successfully added"
//         })
//     } catch(error) {
//         response.status(500).json({
//             "status" : "failure",
//             "message" : "entry not created",
//             "error" : error
//         })
//     }
// })

// app.get('/expense/all/:userID', authenticateToken,async function(request, response) {
//     try {
//         const expenseDetails = await Expense.find({"userID":request.params.userID})
//         response.status(200).json(expenseDetails)
//     } catch(error) {
//         response.status(500).json({
//             "status" : "failure",
//             "message" : "could not fetch data",
//             "error" : error
//         })
//     }
// })

// app.delete('/expense/delete/:id', authenticateToken,async function(request, response) {
//     try {
//         await Expense.findByIdAndDelete(request.params.id)
//         response.status(200).json({
//             "status" : "success",
//             "message" : "entry deleted"
//         })
//     } catch(error) {
//         response.status(500).json({
//             "status" : "failure",
//             "message" : "couldn\'t delete entry",
//             "error" : error
//         })
//     }
// })

// app.patch('/expense/update/:id',authenticateToken, async function(request, response) {
//     try {
//         await Expense.findByIdAndUpdate(request.params.id, {
//             "amount": request.body.amount,
//             "category": request.body.category,
//             "date": request.body.date,
//             "userID":request.body.userID
//         })
//         response.status(200).json({
//             "status" : "success",
//             "message" : "entry updated"
//         })
//     } catch(error) {
//         response.status(500).json({
//             "status" : "failure",
//             "message" : "couldn\'t update entry",
//             "error" : error
//         })
//     }
// })

// app.post('/user/new', async function(request, response) {
//     try {
//         const user = await User.find({"emailID": request.body.emailID})
//         if(user.length === 0) {
//             const user=await User.create({
//                 "emailID": request.body.emailID,
//                 "password": request.body.password,
//                 "userName": request.body.userName
//             })
//             const userDetails={
//                 "userName":user.userName,
//                 "emailID":user.emailID,
//                 "userID":user._id.toString()
//             }
//             const accessToken=generateToken(userDetails)
//             response.status(201).json({
//                 "status": "success",
//                 "message": "new user created",
//                 "access":accessToken,
//                 "userDetails":userDetails
//             })
//         } else {
//             response.status(409).json({
//                 "status": "failure",
//                 "message": "user already exist"
//             })
//         } 
//     } catch(error) {
//         response.status(500).json({
//             "status": "failure",
//             "message": "user not created",
//             "error": error
//         })
//     }
// });

// app.post('/user/login',async(request,response)=>{
//     try{
//         const user= await User.find({"emailID":request.body.emailID,"password":request.body.password});
//         if(user.length===0){
//             response.status(401).json({
//                 "status":"failure",
//                 "message":"user does not exist"
//             });
//         }else{
//             const userDetails={
//                 "userName":user[0].userName,
//                 "emailID":user[0].emailID,
//                 "userID":user[0]._id.toString()
//             }
//             const accessToken=generateToken(userDetails)
//             response.status(200).json({
//                 "status":"success",
//                 "message":"User Exists",
//                 "accessToken":accessToken,
//                 "userDetails":userDetails
//             })
//         }
//     }catch(error){
//         response.status(500).json({
//             "status":"Error",
//             "message":error
//         });
//     }
// });




const bodyParser = require('body-parser')//middle ware
const cors = require('cors')//middle ware
const express = require('express')
const mongoose = require('mongoose')

const expenseRoutes=require('./routes/expenseRoutes.js');
const userRoutes=require('./routes/userRoutes.js');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/expense',expenseRoutes)
app.use('/user',userRoutes)

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://suryamk2003:suryamk2003@cluster0.la65aby.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established :)")

        const port = process.env.PORT || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish DB connection :(')
    }
}
connectToDb()
