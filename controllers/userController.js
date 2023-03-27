exports.getRegister = (req, res, next) => {
  res.render('register', {
    path: '/register',
    pageTitle: 'register'
  });
};
exports.postRegister =(req,res,next) =>{
  const user = {
    name: req.body.userName,
    userPassword: req.body.userPassword,
  }
  if (!req.body.userName || !req.body.userPassword) {
    res.status(400).send('problem');
    return;
  }
  console.log(req.body); // Log the request body to the console
};

exports.getlistview = (req, res, next) => {
  res.render('listview', {
    path: '/listview',
    pageTitle: 'listview'
  });
};
 users =[];
exports.postlistview = (req, res, next) => {
  const { userName,userPassword } =req.body;
    // Add the new user to the users array
    users.push({userName, userPassword });
    // Render the list view with all users
    res.render('listview', {users});  
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