// Requires
var net = require('net');

// Creating a Client
var client = new net.Socket();
var HOST = '0.0.0.0';
var PORT = '6969';

//client.connect(port, host, callback)
client.connect(PORT, HOST, function() {
  console.log('Welcome!');
  process.stdout.write('Enter a username: ');

  process.stdin.setEncoding('utf8');
  // Takes in data and writes it to server
  // 'data' is the event on is looking/listening for
  process.stdin.on('data', function(chunk) {
    if ( chunk !== null ) {
      client.write(chunk.toString());
    }
  });
  process.stdin.on('end', function() {
    client.write('connection ended');
  });

});

client.on('data', function(data) {
  console.log(data.toString().trim());
  // client.destroy();
});

client.on('close', function() {
  console.log('Connection closed');
});
console.log(client);