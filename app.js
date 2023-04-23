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
const User = require('./models/user');
const multer =require('multer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//api with google
//using multer:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('myFile'), (req, res) => {
  // req.file contains information about the uploaded file
  console.log(req.file);
  res.send('File uploaded successfully');
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
 io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (formData) => { // modified to receive form data
    console.log('message: ' + formData.get('message'));

    // code to save the file to disk or database
    if (formData.has('file')) {
      const file = formData.get('file');
      console.log('file:', file.name, file.size, file.type);
    }

    socket.broadcast.emit('message', formData);
  });
});

sequelize.sync().then(() => {
 // sync({ force: true }).
  server.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch(error => console.log(error));
