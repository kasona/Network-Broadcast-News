// Requires
var net = require('net');


// Variables ( easier to edit, if needed )
var HOST = '0.0.0.0';
var PORT = '6969';

// Object to store clients (keep track of clients when connecting)
var clients = [];

// Creating a server with net
// c is socket connection, can have many sockets
var server = net.createServer(function(socket) {
  // ask for a username
  clients.push(socket);

  // Start of connection
  console.log('Server Connected: ' + HOST + ':' + PORT);

  // Listening for data event
  socket.on('data', function(chunk) {
    console.log('received:', chunk);
    sendAll(chunk);
    // create a sendAll(); using the client array, stdout to all clients in [];
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

// ================ Broadcast =====================
function sendAll (data) {
  for ( var i = 0; i < clients.length; i++) {
    clients[i].write(data);
  }
}

// =============== Ask for Username ==============
function username () {
  socket.on('data', function(chunk) {
    console.log('Please enter a username:');
    //Store the first input as user name
    console.log('Is this correct? y / n  ' + username);
    // If client's input ( to lowercase ) == y then store username into array
    // Put username infront of users chunk
    // If client's input ( to lowercase ) == n then Ask user to re-enter username, loop to check
    // If client's input ( to lowercase ) !== y && n then err, user needs to re-enter y or n
  });
}
