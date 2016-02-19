$(function() {
  var socket = io();

  socket.on('message', function(data) {
    console.log(data);
  });

  $('.ping').on('click', function() {
    console.log('ping click');
    socket.emit('message', 'meow');
  });
});
