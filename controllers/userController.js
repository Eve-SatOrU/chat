const users = [];

function registerUser(req, res) {
  const { name, email } = req.body;
  users.push({ name, email });
  res.redirect('/users');
}

function getUsers(req, res) {
  res.render('users', { users });
}

module.exports = {
  registerUser,
  getUsers,
};