// Requires
var net = require('net');
// Variables ( easier to edit, if needed )
var HOST = '0.0.0.0';
var PORT = '6969';


// Creating a server with net
// c is socket connection, can have many sockets
var server = net.createServer(function(socket) {

  // Start of connection
  console.log('Server Connected: ' + HOST + ':' + PORT);
  socket.write('this has to be dynamic');

  // Listening for data event
  socket.on('data', function(chunk) {
  //process is apart of node, stdout displays to terminal
    process.stdout.write(chunk);
  });

  // End of connection
  socket.on('end', function() {
    console.log('Server Disconnect: ' + HOST + ':' + PORT);
  });
});

server.listen(PORT, HOST);
console.log('Listening on .. Host:', HOST, 'Port:', PORT);