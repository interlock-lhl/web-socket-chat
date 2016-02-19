var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log('connection');
  // when the client emits 'new message', this listens and execute

  socket.on('message', function (data) {
    console.log(data);
    socket.emit('message', data);
  });

  socket.on('disconnect', function(){
    console.log('disconnected');
  });
});
