var net = require('net');

var serverPort = 2017;
var server = '127.0.0.1';

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('Connecting to server...');

var client = net.connect({
	server: server,
	port: serverPort 
}, function() {
	console.log('Client connected');

	//Send data
	console.log('Send data to server');

	//Reading input from command line
	rl.question('Request: ', (req) => {
		client.write(req);
		rl.close();
	});

});

client.on('data', function(data) {
	console.log('Received data: ' + data.toString());
	client.end();
});

client.on('error', function(err) {
	console.log(err);
});

client.on('end', function() {
	console.log('Disconnected from server');
});