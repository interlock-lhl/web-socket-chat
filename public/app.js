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
    insertChatMessage({message: message.val()});
  }

  function insertChatMessage(data) {
    var messages = $('#messages');
    messages.append(chatTemplate({id: "meow", message: data.message}));
    messages.animate({ scrollTop: messages[0].scrollHeight}, 250);
  }


});
