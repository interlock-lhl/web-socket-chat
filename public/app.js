$(function() {
  var socket = io();
  var sentTime = null;

  socket.on('message', function(who, message) {
    if (who === 'SERVER') {
      console.log(who, message);
    } else {
      if (who === socket.id) {
        console.log(Date.now() - sentTime);
      }
      insertChatMessage(who, message);
    }
  });

  socket.on('info', function(type, value) {
    if (type == 'USER_COUNT') {
      $('#clients').html(value);
    } else if (type == 'JOINED_ROOM') {
      $('.room').html(value);
    } else if (type == 'ROOM_COUNT') {
      console.log(type, value);
      $('#room_clients').html(value);
    } else {
      console.log(type, value);
    }
  });

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
    sentTime = Date.now();
    socket.emit('message', socket.id, message.val());
    message.val('');
    // insertChatMessage({message: message.val()});
  }

  function insertChatMessage(who, message) {
    var messages = $('#messages');
    messages.append(chatTemplate({id: who, message: message}));
    messages.animate({ scrollTop: messages[0].scrollHeight}, 250);
  }


});
