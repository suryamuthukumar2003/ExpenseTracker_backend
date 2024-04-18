const express=require('express');
const { createUser, validateUser } = require('../controllers/userController');
require('../controllers/userController.js')
const router=express.Router();

router.post('/user/new', createUser);

router.post('/user/login',validateUser);

module.exports=router;