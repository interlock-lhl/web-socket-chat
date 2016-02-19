$(function() {
  var socket = io();
  var chatTemplate = Handlebars.compile($('#chat-template').html());
  var CHAT_LIMIT = 10;

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
    $('#messages').animate({scrollTop: $('#messages').height()});
    var messages = $('#messages > div');
    if (messages.length > CHAT_LIMIT) {
      messages.slice(0, messages.length - CHAT_LIMIT).each(function(i, elm) {
        elm.remove();
      });
    }
  };

  socket.on('chat-event', function(data) {
    insertChatMessage(data);
  })
});
