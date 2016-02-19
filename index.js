var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var crypto = require('crypto');

app.use(express.static(__dirname + '/public'));

server.listen(3000, function() {
  console.log('listen on port 3000');
});

io.on('connection', function(socket) {
  console.log('new connection: ' + socket.id);
  socket.connected_at = new Date();

  socket.on('message-send', function(data) {
    var hash = crypto.createHash('sha256')
    io.emit('chat-event', {id: hash.update(socket.id).digest('hex'), message: data.message});
  });
});
