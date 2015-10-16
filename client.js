// Requires
var net = require('net');

// Creating a Client
var client = new net.Socket();

//client.connect(port, host, callback)
client.connect(6969, '0.0.0.0', function() {
  console.log('Connected');
  client.write('This is Client! ');

  // Takes in data and writes it to server
  process.stdin.on('data', function(chunk) {
    client.write(chunk);
  });
});


client.on('data', function(data) {
  console.log('Received: ' + data);
  // client.destroy();
});

// client.on('close', function() {
//   console.log('Connection closed');
// });
console.log(client);