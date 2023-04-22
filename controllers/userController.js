const User = require('../models/user');
const bcrypt = require('bcrypt');
const multer =require('multer');
const upload =multer({dest:'uploads/'});
const session = require('express-session');
exports.getIndex = async(req, res, next) => {
    const user = req.session.user;
    res.render('index', { user });
  }
//hashing password
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.userPassword = await bcrypt.hash(user.userPassword, salt);
});
exports.getRegister = (req, res, next) => {
  res.render('register', {
    path: '/register',
    pageTitle: 'register'
  });
};
  exports.postRegister = async (req, res,next) => {
    const { userName, userPassword,email } = req.body;
    try {
      const user = await User.create({ userName, userPassword,email });
      res.redirect('/login');
    } catch (error) {
      res.render('register', { error });
    }
  };  
exports.getLogin = (req, res, next) => {
  res.render('login', {
    path: '/login',
    pageTitle: 'login'
  });
};
exports.postLogin= (async (req, res) => {
  const { userName, userPassword } = req.body;
  const user = await User.findOne({ where: { userName } });
  if (!user) {
    return res.status(500).send('Something broke!');
  }
  // const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
  // if (!isPasswordValid) {
  //   return res.status(500).send('your password wrong try again!');
  // }
  req.session.user = user;
  return res.redirect('/');
});
  exports.getprofile = async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { user }); // passing the user object to the template
  };
  exports.getLogout=async(req, res) => {
  //show that user in the session
  console.log("User in session:", req.session.user);
    req.session.destroy();
    res.redirect('/');
};
exports.getchat =(req, res) => {
  const userId = req.session.user.id;
  const chatWithId = req.params.id;
  User.findByPk(chatWithId).then(user => {
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('chat', { user: user });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
};
exports.getAbout =(req,res,next)=>{
  res.render('about',{
    pageTitle:'About',
    path:'/about'
  });
}
exports.donate=(req,res) =>{
  res.render('donate',{
    pageTitle:'Donate',
    path:'/donate'
  });
}
exports.getlist=(req,res)=>{
  res.render('list',{
    pageTitle:'List',
    path:'/list'
  });
}
// app.post('/upload', upload.single('myFile'), (req, res) => {
//   // req.file contains information about the uploaded file
//   console.log(req.file);
//   res.send('File uploaded successfully');
// });
exports.postupload = (req, res, next) => {
  upload.single('myFile')(req, res, function (err) {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    }

    console.log(req.file);
    res.send('File uploaded successfully');
  });
};