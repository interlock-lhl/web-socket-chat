var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var crypto = require('crypto'); // var hash = crypto.createHash('sha256');
var port = process.env['PORT'] || 3000;

// serve our static assets out of ./public
app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
  console.log('listen on port ' + port);
});

io.on('connection', function(socket) {
  
});
