'use strict';

let http = require('http')
  , url = require('url')
  , fs = require('fs');

const port = 3000;

http.createServer(function(request, response) {
	
	var result = url.parse(request.url, true);
	response.setHeader("method",request.method);
	response.setHeader("URL",request.url);
	response.setHeader("httpVersion","HTTP/" + request.httpVersion);

	response.writeHead(200, {'Content-Type':'text/html'});

	fs.readFile('./index.html', function(err, file) {
		if (err) console.log("Erro ao ler arquivo.");

		response.end(file);

	});

	//response.end();

}).listen(port, function() {
	console.log('Servidor rodando em localhost:'+port);
});