const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

let currentSlideIndex = 0;

var messages = []

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(function(req, res, next) {
  req.io = io;
  next();
});


io.on('connection', function (socket) {
  console.log("new client connected")
    socket.on("sendMessage", function(message) {
      console.log("ASD")
      messages.push(message)
      io.emit("updateMessage", messages)
    })
    socket.on("getMessage", function(temp){
      console.log("MASUK")
      io.emit("updateMessage", messages)
    })
  // socket.emit('submit', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

server.listen(port, function() {
  console.log('Listening on port', port);
});