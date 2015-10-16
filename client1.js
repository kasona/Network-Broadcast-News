// Requires
var net = require('net');

// Creating a Client
var client = new net.Socket();
var HOST = '0.0.0.0';
var PORT = '6969';

//client.connect(port, host, callback)
client.connect(PORT, HOST, function() {
  console.log('Connected');
  client.write('This is Client1! ');

  // Takes in data and writes it to server
  // 'data' is the event on is looking/listening for
  process.stdin.on('data', function(chunk) {
    client.write('Client 1: ');
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