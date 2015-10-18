var net = require('net');
var HOST = '0.0.0.0';
var PORT = 6969;
var clients = [];
var client = [];

var server = net.createServer(function(socket) {
  // set socket.id to null asap
  socket.id = null;

  // push clients into an array
  clients.push(socket);

  //input data from clients
  socket.on('data', function(data) {

    // trim takes away white spaces
    var clientId = data.toString().trim();
    var adminId = data.toString().trim();
  });

  //=========== Admin ======================
  process.stdin.on('data', function(data) {
    var adminWords = data.toString();
    socket.write('[ADMIN]: ' + adminWords);
  });

  // =========== Everyone Else ==============
  socket.on('data', function (data) {
    if (socket.id === null) {
      for (var j = 0; j < clients.length; j++) {
        if (data.toString().trim() === clients[j].toString().trim() || data.toString().trim() === '[ADMIN]') {
          return socket.write('pick a different username\r\n' + 'username: ');
        }
      }
      socket.id = data.toString().trim();
      clients.push(socket.id);
    }
    process.stdout.write(socket.id + ':' + ' ' + data);
    for (var i = 0; i < client.length; i++) {
      if (client[i] === socket) continue;
      client[i].write(socket.id + ': ' + data.toString());
    }
  });

}); // End of server

// ================ Broadcast =====================
function sendAll (data) {
    for ( var i = 0; i < clients.length; i++) {
      clients[i].write(data);
    }
  }

//listen to port address
server.listen({ host : HOST, port : PORT,} , function() {
  console.log('server listening on ' + HOST + ':' + PORT);
});