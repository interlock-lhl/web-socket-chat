const _ = require('underscore');

function Room(io, socket, name) {
  this.io = io;
  this.name = name;
  this.socket = socket;

  this.join = function() {

    // var room = message.substr(5).trim();
    if (this.socket.room !== undefined) {
      this.socket.room.leave();
    }
    this.socket.join(this.name);
    this.socket.emit('info', 'JOINED_ROOM', this.name);
    this.io.to(this.name).emit('info', 'ROOM_COUNT', this.count());
    this.socket.room = this;
  };

  this.count = function() {
    // return this.io.sockets.clients(this.name).length;
    if (this.io.sockets.adapter.rooms[this.name] === undefined) return 0;
    return this.io.sockets.adapter.rooms[this.name].length;
  };

  this.message = function(message) {
    this.io.to(this.name).emit('message', this.socket.io, message);
  };

  this.leave = function() {
    this.socket.leave(socket.room.name);
    this.io.to(this.name).emit('info', 'ROOM_COUNT', this.count());
  };
}

module.exports = { Room: Room };
