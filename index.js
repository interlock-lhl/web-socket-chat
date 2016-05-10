const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

server.listen(port, '0.0.0.0', function() {
  console.log('listen on port ' + port);
});

var history = [];
var typers = [];

io.on('connection', function(socket) {
  // console.log(socket.conn.request.remoteIp);
  console.log(`new connection from: [${socket.id}][${socket.ip}]`);

  socket.on('register', function(data) {
    socket.who = data.who;
    var id = crypto.createHash('sha256').update(data.who, 'utf8').digest().toString('hex');
    socket.who_id = id;
    socket.emit('registered', { status: 'OK' });
    socket.emit('messages', history);
    io.emit('joined', { who: data.who});
  });

  socket.on('typing', function() {
    if (typers.indexOf(socket.who) == -1) {
      typers.push(socket.who);
      io.emit('typing', typers);
    }
  });

  socket.on('message', function(data) {
    if (socket.who === undefined) {
      return socket.emit('error', { message: "Only registered users can send messages"});
    }
    console.log(`MSG[${socket.id}][${data.message}]`);
    history.push({
      message: data.message,
      who: socket.who,
      id: socket.who_id
    });
    io.emit('message', {
      message: data.message,
      who: socket.who,
      id: socket.who_id
    });
  });

  socket.on('disconnect', function(){
    console.log(`disconnected [${socket.id}]`);
  });
});
