const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
router.get('/register', userController.getRegister);
router.post('/register' , userController.postRegister);
router.get('/',userController.getIndex);
router.get('/login',userController.getLogin);
router.post('/login',userController.postLogin);
router.get('/logout',userController.getLogout);
router.get('/chat/:id',userController.getchat);
router.post('/chat/:id',userController.postchat);
router.get('/profile/:id',userController.getprofile);
// router.post('/clear',userController.postclear);
router.get('/about',userController.getAbout);
router.get('/donate',userController.donate);
router.get('/list',userController.getlist);
// router.post('/send-file',userController.postfile);

module.exports = router;
