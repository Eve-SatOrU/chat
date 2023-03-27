// using les sockets with login 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const userController = require('./controllers/userController');
const errorController=require('./controllers/error.js');


app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('public'));
app.use('/', routes);
app.use(errorController.get404);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log('Server started on port 3000');
});