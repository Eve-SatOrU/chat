// using les sockets with login 
const express = require('express');
const app = express();

const routes = require('./routes/routes');
const userController = require('./controllers/userController');

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

app.post('/register', userController.registerUser);
// app.get('/users', userController.getUsers);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});