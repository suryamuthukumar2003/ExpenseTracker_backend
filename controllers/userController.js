const{User}=require('../models/User.js');
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretkey=process.env.SECRET_KEY;

function generateToken(userDetails){
    return jwt.sign(userDetails,secretkey);
}

async function validateUser(req,res){
    // try{
    //     const user= await User.find({"emailID":request.body.emailID,"password":request.body.password});
    //     if(user.length===0){
    //         response.status(401).json({
    //             "status":"failure",
    //             "message":"user does not exist"
    //         });
    //     }else{
    //         const userDetails={
    //             "userName":user[0].userName,
    //             "emailID":user[0].emailID,
    //             "userID":user[0]._id.toString()
    //         }
    //         const accessToken=generateToken(userDetails)
    //         response.status(200).json({
    //             "status":"success",
    //             "message":"User Exists",
    //             "accessToken":accessToken,
    //             "userDetails":userDetails
    //         })
    //     }
    // }catch(error){
    //     response.status(500).json({
    //         "status":"Error",
    //         "message":error
    //     });
    // }
    try {
        const user = await User.findOne({ emailID: req.body.emailID });
        if (!user) {
          return res.status(401).json({
            status: "failure",
            message: "User does not exist",
          });
        }
    
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              status: "error",
              message: "Authentication failed",
              error: err,
            });
          }
    
          if (!result) {
            return res.status(401).json({
              status: "failure",
              message: "Invalid password",
            });
          }
    
          const userDetails = {
            userName: user.userName,
            emailID: user.emailID,
            userID: user._id.toString(),
          };
          const accessToken = generateToken(userDetails);
          return res.status(200).json({
            status: "success",
            message: "User valid",
            accessToken: accessToken,
            userDetails: userDetails,
          });
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Authentication failed",
          error: error,
        });
      }
}

 async function createUser(request, response) {
    
    try {
        const user = await User.find({"emailID": request.body.emailID})
        
        if(user.length === 0) {
          bcrypt.genSalt(saltRounds,async function(err, salt) {
            bcrypt.hash(request.body.password, salt, async function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                
                  res.status(500).json({
                    status: "failure",
                    message: "Error hashing password",
                    error: err
                  });
                }
                const user=await User.create({
                  "emailID": request.body.emailID,
                  "password": hash,
                  "userName": request.body.userName
              })
              const userDetails={
                "userName":user.userName,
                "emailID":user.emailID,
                "userID":user._id.toString()
              }
              const accessToken=generateToken(userDetails)
              response.status(201).json({
                "status": "success",
                "message": "new user created",
                "accessToken":accessToken,
                "userDetails":userDetails
              })
            });
        });    
        } 
        else {
            response.status(409).json({
                "status": "failure",
                "message": "user already exist"
            })
        } 
    } catch(error) {
        response.status(500).json({
            "status": "error",
            "message": "user not created",
            "error": error
        })
    }
    // try {
    //     const user = await User.find({ emailID: req.body.emailID });
    //     console.log(user)
    //     if (user.length === 0) {
    //       bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    //         console.log("error:"+err)
    //         if (err) {
    //           console.log(err);
    //           return res.status(500).json({
    //             status: "failure",
    //             message: "Error hashing password",
    //             error: err
    //           });
    //         }
            
    //         try {
    //           const newUser = await User.create({
    //             emailID: req.body.emailID,
    //             password: hash, 
    //             userName: req.body.userName
    //           });
    //           comsole.log(newUser)
    //           const userDetails = {
    //             userName: newUser.userName,
    //             emailID: newUser.emailID,
    //             userID: newUser._id.toString()
    //           };
    
    //           const accessToken = generateToken(userDetails);
    
    //           return res.status(201).json({
    //             status: "success",
    //             message: "New user created",
    //             accessToken: accessToken,
    //             userDetails: userDetails
    //           });
    //         } catch (error) {
    //           return res.status(500).json({
    //             status: "failure",
    //             message: "Error creating user",
    //             error: error
    //           });
    //         }
    //       });
    //     } else {
    //       return res.status(403).json({
    //         status: "failure",
    //         message: "User already exists"
    //       });
    //     }
    //   } catch (error) {
    //     return res.status(500).json({
    //       status: "failure",
    //       message: "Error finding user",
    //       error: error
    //     });
    //   }
}

module.exports={createUser,validateUser};