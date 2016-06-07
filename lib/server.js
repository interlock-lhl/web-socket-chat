const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const _ = require('underscore');
const Room = require('./room');

// const crypto = require('crypto'); // const hash = crypto.createHash('sha256');
const port = process.env['PORT'] || 3000;

// serve our static assets out of ./public
app.use(express.static(__dirname + './../public'));

server.listen(port, function() {
  console.log('listen on port ' + port);
});

var rooms = {};

io.on('connection', function(socket) {
  console.log(`Connection ${socket.id}`);
  socket.emit('message', 'SERVER', 'HOWDY PARTNER');
  io.emit('info', 'USER_COUNT', _.keys(io.sockets.connected).length);

  // default room
  new Room.Room(io, socket, '#general').join();

  socket.on('message', function(who, message) {
    if (message.substr(0,5) == '/join') {
      new Room.Room(io, socket, message.substr(5).trim()).join();
      return;
    }
    if (message.length > 256) {
      return socket.emit('message', 'SERVER', 'message too long');
    }
    console.log("NEW MESSAGE: ", who, message);
    socket.room.message(message);
  });

  socket.on('disconnect', function(socket) {
    console.log(`Disconnected ${socket.id}`);
    io.emit('info', 'USER_COUNT', _.keys(io.sockets.connected).length);
  });
});
