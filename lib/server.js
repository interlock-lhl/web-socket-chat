const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const crypto = require('crypto'); // const hash = crypto.createHash('sha256');
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
  socket.on('message', function(who, message) {
    console.log("NEW MESSAGE: ", who, message);
    io.emit('message', who, message);
  });

});
