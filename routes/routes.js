const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/register', userController.getRegister);
router.post('/register' , userController.postRegister);
// router.get('/listview',userController.getlistview);
// router.post('/listview',userController.postlistview);
router.get('/',userController.getIndex);
router.get('/login',userController.getLogin);
router.post('/login',userController.postLogin);
router.get('/logout',userController.getLogout);
// router.post('/clear',userController.postclear);

module.exports = router;