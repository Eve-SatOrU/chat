exports.getRegister = (req, res, next) => {
  res.render('register', {
    path: '/register',
    pageTitle: 'register'
  });
};
exports.postRegister =(req,res,next) =>{
  //using list to put all username into this register
};

exports.getlistview = (req, res, next) => {
  res.render('listview', {
    path: '/listview',
    pageTitle: 'listview'
  });
};
users=[];
exports.postlistview = (req, res, next) => {
  const { userName,userPassword } = req.body;
    // Add the new user to the users array
    users.push({ userName, userPassword });
    // Render the list view with all users
    res.render('listview', { users });  
};

exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
    pageTitle: 'index'
  });
};
//getlogin
exports.getLogin = (req, res, next) => {
  res.render('login', {
    path: '/login',
    pageTitle: 'login'
  });
};
exports.postclear =(req , res, next) =>{
    // Clear the users array
    users.length = 0;
    // Redirect back to the list view
    res.redirect('/register');
};