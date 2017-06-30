const net = require('net');

const serverPort = 2017;

const server = net.createServer(function(client) {
	var remoteAddress = client.remoteAddress + ":" + client.remotePort;
	console.log('Client connected');
	console.log('Client IP Address: ' + remoteAddress);
	//console.log('Is IPv6: ' + net.isIPv6(client.remoteAddress));
	//console.log('Total server connections: ' + server.connections);

	//Waiting for data from the client
	client.on('data', function(data) {
		console.log('\nRequest from client: ' + data.toString());
		
		var cmd = String(data).split(/\s+/);

		if (cmd[0].toUpperCase() == 'INC') {
			response = "INC Return => " + (parseInt(cmd[1]) + 1);
		} else 
		if (cmd[0].toUpperCase() == 'DEC') {
			response = "DEC Return => " + (parseInt(cmd[1]) - 1);
		} else {
			response = "Correct use => INC X, DEC X";
		}

		console.log("Send to client: " + response);

		//Write data to the client socket
		client.write(response);
	});

	client.on('request', function(req, res) {
		res.write('NodeJS Server');
		res.end();
	});

	//Closed socket event from the client
	client.on('end', function() {
		console.log('Client disconnected\n');
		console.log("#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#\n");
	});
});

server.on('error', function(err) {
	console.log(err);
	//Closing the server if an error occurs
	server.close();
});

server.listen(serverPort, function() {
	console.log("\n#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#");
	console.log('#     Server listening on localhost:' + serverPort + "      #");
	console.log("#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#\n");
});