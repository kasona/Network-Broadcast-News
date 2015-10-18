var net = require('net');
var HOST = '0.0.0.0';
var PORT = 6969;
var clients = [];

var server = net.createServer(function(socket) {
  // set socket.id to null asap
  socket.id = null;
  // look for admin
  socket.admin = 'admin';

  // push clients into an array
  clients.push(socket);

  //input data from clients
  socket.on('data', function(data) {
    // trim takes away white spaces
    var clientId = data.toString().trim();
    var adminId = data.toString().trim();

    // ========== username ======
    // Check for Admins first, rest should be regular people
    if (socket.id === null) {
      socket.id = clientId;
    } else if (socket.id === 'admin') {
      admin(socket.id + ': ' + data, socket);
    } else {
      chat(socket.id + ': ' + data, socket);
    }
  });

  // ============== Admin ===============
  function admin(message, sender) {
    clients.forEach(function(clientName) {
      // search for client.id's with admin
      if (clientName.id === 'admin') {
        clientName.write(message);
      }
    });
    process.stdout.write(message);
  }

  //if not from sender post to all other sockets
  function chat(message, sender) {
    clients.forEach(function(clientName) {
      if (clientName.id === sender.id) {
        return;
      }
      clientName.write(message);
    });
    process.stdout.write(message);
  }

});

//listen to port address
server.listen({ host : HOST, port : PORT,} , function() {
  console.log('server listening on ' + HOST + ':' + PORT);
});