// Requires
var net = require('net');
var fs = require('fs');

// Variables ( easier to edit, if needed )
var HOST = '0.0.0.0';
var PORT = '6969';

// Creating a server with net
var server = net.createServer(function(c) {

  // Start of connection
  console.log('CONNECTED: ' + HOST + ':' + PORT);

  // End of connection
  c.on('end', function() {
    console.log('DISCONNECTED: ' + HOST + ':' + PORT);
  });

  c.write('hello\r\n');
  c.pipe(c);
});

server.listen(PORT, HOST);
console.log('Listening on .. Host:', HOST, 'Port:', PORT);