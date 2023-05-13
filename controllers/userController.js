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
  if (!userName || !/^[a-zA-Z0-9]+$/.test(userName)) {
    errors.push('User name must only contain letters and numbers');
    console.log(errors);
  }
  if (!userPassword || !/^[a-zA-Z0-9]+$/.test(userPassword)) {
    errors.push('Password must only contain letters and numbers');
    console.log(errors);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.endsWith("--")) {
    errors.push('Email is not valid');
    console.log(errors);
  }

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
const blacklist = ['blacklistedUser1@example.com', 'blacklistedUser2@example.com'];

const isBlacklisted = (email) => {
  return blacklist.includes(email);
};

exports.getchat = (req, res) => {
  const userId = req.session.user.id;
  const chatWithId = req.params.id;
  User.findByPk(chatWithId).then(user => {
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isUserBlacklisted = isBlacklisted(user.email);
    res.render('chat', { user: user, isBlacklisted: isUserBlacklisted });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
};

exports.postchat = (req, res) => {
  const userId = req.session.user.id;
  const chatWithId = req.params.id;
  const message = req.body.message;

  User.findByPk(chatWithId).then(user => {
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (isBlacklisted(user.email)) {
      return res.status(403).send('You are not authorized to send messages');
    }

    // send the message
    // ...

    res.sendStatus(200);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
};


//
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