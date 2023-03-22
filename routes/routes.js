// const express = require('express');
// const router = express.Router();

// // Route for registering a new user
// router.get('/register', (req, res) => {
//   // TODO: Handle user registration
//  });
 
// router.post('/register', (req, res) => {
//  // TODO: Handle user registration
// });

// // Route for displaying the list of users
// router.get('/users', (req, res) => {
//   // TODO: Retrieve list of users and render view
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

// Route for registering a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // TODO: Validate user input and save new user to database
  res.redirect('/register-success');
});

module.exports = router;