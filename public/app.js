$(function() {
  var socket = io();
  var chatTemplate = Handlebars.compile($('#chat-template').html());
  var registered = false;
  var registerModal = $('#registerModal');
  var messages = $('#messages');

  registerModal.modal('toggle');

  $('#registerButton').click(function(e) {
    var who = $("input[name=who]").val();

    socket.emit('register', {who: who});
  });

  socket.on('registered', function(data) {
    if (data.status == 'OK') {
      registered = true;
      registerModal.modal('toggle');
    } else {
      console.log('error registering');
    }
  });

  $('#message').on('keyup', function(event) {
    debugger;
    if (event.keyCode == 13) {
      submittMessage();
      return;
    }
    socket.emit('typing');
  });

  $('#message-send').on('click', function() {
    submittMessage();
  });

  function submittMessage() {
    var msg = $('#message').val();
    socket.emit('message', { message: msg });
    $('#message').val('');
  }

  function insertChatMessage(data) {
    messages.append(chatTemplate(data));
    messages.animate({scrollTop: $('#messages').height()});
  }

  socket.on('message', function(data) {
    insertChatMessage(data);
  });

  socket.on('messages', function(data) {
    for(var i in data) {
      insertChatMessage(data[i]);
    }
  });

  socket.on('joined', function(data) {
    messages.append('<div>' + data.who + " joined</div>");
  });

  function updateChatters(data) {
    debugger;
    $('#chatters').html(data.join(','));
  }

  socket.on('typing', function(data) {
    updateChatters(data);
  });
});
