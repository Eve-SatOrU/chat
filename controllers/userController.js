const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
exports.getIndex = async(req, res, next) => {
    const user = req.session.user;
    res.render('index', { user });
  }

// exports.postclear =(req , res, next) =>{
//   // Clear the users array
//   users.length = 0;
//   // Redirect back to the list view
//   res.redirect('/register');
// };

// exports.getlistview = (req, res, next) => {
//   res.render('listview', {
//     path: '/listview',
//     pageTitle: 'listview'
//   });
// };
//  users =[];
// exports.postlistview = (req, res, next) => {
//   const { userName,userPassword } =req.body;
//     // Add the new user to the users array
//     users.push({userName, userPassword });
//     // Render the list view with all users
//     res.render('listview', {users});  
// };
//login when i user array
// exports.getRegister = (req, res, next) => {
//   res.render('register', {
//     path: '/register',
//     pageTitle: 'register'
//   });
// };
// exports.postRegister =(req,res,next) =>{
//   const user = {
//     name: req.body.userName,
//     userPassword: req.body.userPassword,
//   }
//   if (!req.body.userName || !req.body.userPassword) {
//     res.status(400).send('problem');
//     return;
//   }
//   console.log(req.body); // Log the request body to the console
// };
// //getlogin
// exports.getLogin = (req, res, next) => {
//   res.render('login', {
//     path: '/login',
//     pageTitle: 'login'
//   });
// };
// //postlogin
// exports.postLogin = (req, res, next) => {
//   const { userName,userPassword } =req.body;
//   // Add the new user to the users array
//   users.push({userName, userPassword });
//   // Render the list view with all users
//   res.render('listview', {users});
//   };
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
    const { userName, userPassword } = req.body;
    try {
      const user = await User.create({ userName, userPassword });
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
  // const requireLogin = (req, res, next) => {
  //   if (!req.session.user) {
  //     return res.redirect('/login');
  //   }
  //   next();
  // };
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
    res.redirect('/login');
};
// exports.getchat=(req, res) => {
//   res.render('chat', { user: req.session.user });
// };
exports.getchat =(req, res) => {
  const userId = req.session.user.id;
  const chatWithId = req.params.id;
  User.findByPk(chatWithId).then(user => {
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('chat', { user });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
};