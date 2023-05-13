//add api google
// using les sockets with login 
const express = require('express');
//add passport to use api
const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const multer = require('multer');
const User = require('./models/user');
//proxy with express
const proxy = require('express-proxy');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//api with google
//models
const Message = require('./models/message');
const user =require('./models/user');
//multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
 
const upload = multer({ storage: storage });
app.post('/send-file', upload.single('file'), (req, res) => {
  const message = req.body.message;
  const fileUrl = req.file.filename;

  // broadcast the message and file URL to all clients
  io.emit('file', { message: message, fileUrl: fileUrl });

  res.redirect('/');
});

//socket
const server = http.createServer(app);
const io = socketio(server);

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

const userController = require('./controllers/userController');
const errorController = require('./controllers/error.js');
app.use(errorController.get404);
 // app.use(express.json());
 //proxy 
app.use('/chat', proxy('http://localhost:3000'));
// Define a function to check if a user is blacklisted
const isBlacklisted = (user) => {
  const blacklist = ['hacker', 'blacklistedUser1', 'blacklistedUser2'];
  return blacklist.includes(user);
};
 io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', async (msg) => {
    console.log('message: ' + msg);

    // Create a new Message and store it in the database
    const message = await Message.create({
      content: msg,
      sender: 'eve', // Replace this with the actual sender's name
      encrypted: true // Set this to true to encrypt the message
    });

    // Emit the message content to all clients
    io.emit('message', msg);
  });
});

// Define the middleware to check if a user is blacklisted before sending a message
const checkBlacklist = (req, res, next) => {
  const { sender } = req.body;
  if (isBlacklisted(sender)) {
    res.status(403).send('You are not authorized to send messages');
  } else {
    next();
  }
};


sequelize.sync().then(() => {
 // sync({ force: true }).
  server.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch(error => console.log(error));


