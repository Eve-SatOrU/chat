// using les sockets with login 
const express = require('express');
const bodyParser = require('body-parser');
const sequelize =require('./util/database');
const session = require('express-session');
const app = express();
const User = require('./models/user');
app.use(bodyParser.urlencoded({ extended: true }));
//socket
const server = require('http').Server(app);
const io = require('socket.io')(server);



app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const routes = require('./routes/routes');
app.use('/', routes);
//socket
// io.on('connection', (socket) => {
//   console.log('A user has connected!');

//   socket.on('message', (data) => {
//     console.log(`Received message from ${data.username}: ${data.message}`);

//     // Broadcast the message to all clients except the sender
//     socket.broadcast.emit('message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user has disconnected!');
//   });
// });
// initialize an empty array to store messages
let messages = [];

// listen for new messages from clients
io.on('connection', (socket) => {
  socket.on('message', (message) => {
    // add the new message to the array
    messages.push(message);
    // emit the message to all connected clients
    io.emit('message', message);
  });
});



const userController = require('./controllers/userController');
const errorController=require('./controllers/error.js');
app.use(errorController.get404);
// app.use(express.json());
sequelize.
sync().
// sync({ force: true }).
  then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(error => console.log(error));