var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var crypto = require('crypto');
var port = process.env['PORT'] || 3000;

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
  console.log('listen on port ' + port);
});

io.on('connection', function(socket) {
  console.log('new connection: ' + socket.id);
  socket.connected_at = new Date();

  socket.on('message-send', function(data) {
    var message = data.message;
    message = message.trim();
    if (message.length == 0) {
      socket.emit('error', 'Chat message length invalid');
    };
    var hash = crypto.createHash('sha256')
    io.emit('chat-event', {id: hash.update(socket.id).digest('hex'), message: data.message});
  });
});
