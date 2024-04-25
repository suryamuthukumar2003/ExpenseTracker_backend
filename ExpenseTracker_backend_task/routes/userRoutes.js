const express=require('express');
const { createUser, validateUser } = require('../controllers/userController');
require('../controllers/userController.js')
const router=express.Router();

router.post('/new', createUser);

router.post('/login',validateUser);

module.exports=router;