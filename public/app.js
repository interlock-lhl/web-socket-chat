$(function() {
  var socket = io();
  var chatTemplate = Handlebars.compile($('#chat-template').html());

  $('#message-send').on('click', function() {
    messageSend($('#message'));

  });

  $('#message').on('keyup', function(event) {
    if (event.keyCode == 13) {
      messageSend($('#message'));
    }
  });

  function messageSend(message) {
    socket.emit('message-send', {message: message.val()});
    message.val('');
  }

  function insertChatMessage(data) {
    $('#messages').append(chatTemplate(data));
  };

  socket.on('chat-event', function(data) {
    insertChatMessage(data);
  })
});
