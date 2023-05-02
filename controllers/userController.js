const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Message = require('../models/message');
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
    const errors =[];
      // Check if user name is empty or contains invalid characters
  if (!userName || !/^[a-zA-Z0-9]+$/.test(userName)) {
    errors.push('User name must only contain letters and numbers');
    console.log(errors);
  }
  // Check if password is empty or contains invalid characters
  if (!userPassword || !/^[a-zA-Z0-9]+$/.test(userPassword)) {
    errors.push('Password must only contain letters and numbers');
    console.log(errors);
  }

  // Check if email is valid
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email is not valid');
    console.log(errors);
  }

  // If there are any errors, render the register page with the errors
  if (errors.length > 0) {
    return res.render('register', { errors });
  }
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


// //using crypto 
// const secretKey = 'mySecretKey';

// function encryptMessage(message) {
//   const cipher = crypto.createCipher('aes-256-cbc', secretKey);
//   let encrypted = cipher.update(message, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// function decryptMessage(encryptedMessage) {
//   const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
//   let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
// const encryptedMessage = encryptMessage('Hello, world!');
// console.log('Encrypted message:', encryptedMessage);

// const decryptedMessage = decryptMessage(encryptedMessage);
// console.log('Decrypted message:', decryptedMessage);


// exports.postMessage = async (req, res, next) => {
//   const encryptedMessage = encryptMessage(req.body.message);
// const message = await Message.create({
//   content: encryptedMessage,
//   sender: req.session.userId,
// });
// };