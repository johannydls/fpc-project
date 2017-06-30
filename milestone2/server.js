'use strict';

let http = require('http')
  , fs = require('fs');

const port = 3000;

http.createServer(function(request, response) {
	
	response.setHeader("method",request.method);
	response.setHeader("URL",request.url);
	response.setHeader("httpVersion","HTTP/" + request.httpVersion);

	response.writeHead(200, {'Content-Type':'text/html'});

	console.log("Client request: " + request.method + " " + request.url + " HTTP/" + 
		request.httpVersion + " " + response.statusCode + " " + response.statusMessage);

	fs.readFile('./index.html', function(err, file) {
		if (err) console.log("Erro ao ler arquivo.");

		response.end(file);

	});

}).listen(port, function() {
	console.log('Servidor rodando em localhost:'+port);
});