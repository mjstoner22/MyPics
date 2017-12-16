
/*var http = require('http');
var url = require('url');
var fs = require('fs');

var winston = require('winston');
var tsFormat = () => (new Date()).toLocaleTimeString();
winston.level = 'debug';
winston.info('Hello world');
winston.debug('Debugging info');


var ROOT_DIR = "html/";
var port = process.env.port || 1337


function responseHandler(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var urlObj = url.parse(req.url, true, false);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
		}
		console.log("Hello. This is happening here.");
        res.writeHead(200);
        res.end(data);
    });
};

http.createServer(responseHandler).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');


var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.normalize(__dirname) + '/public'));

app.use(function(req, res, next){
  console.log('Request from ' + req.ip);
  next();
});

app.get('/',function(req,res){
	res.send('Hello World!');
});
app.get('/Hello',function(req,res){
	res.send('Hello Rafa!');
});
app.use(function(req, res){
	res.type('text/plan');
	res.status(404);
	res.send('404 Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plan');
	res.status(500);
	res.send('500 Sever Error');
});


http.createServer(app).listen(3000, function(){
	console.log('Express server listening on port ' + 3000);
})*/



var express = require('express');
var config = require('./config/config');   

var app = express();    

require('./config/express')(app, config);
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports = app;






