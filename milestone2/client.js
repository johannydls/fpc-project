const http = require('http')
	, port = 3000;

http.get({
	hostname: 'localhost',
	path: '/',
	port: port,
	agent: false
	//res = response
}, (res) => {

	let body = '';
	console.log('TYPE: ' + res.headers['method'] + " " + res.headers['url'] + " " + res.headers['httpversion']);
	console.log('STATUS: ' + res.statusCode + " " + res.statusMessage);
	console.log('HEADERS: ' + JSON.stringify(res.headers, null, 2));

	res.on('data', function(data) {
		body += data;
	});

	res.on('end', function() {
		console.log('BODY:\n', body);
	});

});