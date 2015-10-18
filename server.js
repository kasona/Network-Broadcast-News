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
  });

  // ============= Admin ================
  process.stdin.on('data', function(data) {
    var adminWords = data.toString();
    socket.write('[ADMIN]: ' + adminWords);
  });

});

// ========= Everyone Else ===============
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

// ================ Broadcast =====================
// function sendAll (data) {
//   for ( var i = 0; i < clients.length; i++) {
//     clients[i].write(data);
//   }
// }

//listen to port address
server.listen({ host : HOST, port : PORT,} , function() {
  console.log('server listening on ' + HOST + ':' + PORT);
});