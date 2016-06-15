var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var users = [];
var messages = [];
app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"static/stylesheets")))
app.get('/', function(req,res){
	res.render('index');
})

port = 8000;
var server = app.listen(port, function(){
	console.log('Working on port: ' + port);
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	socket.on('new_user', function(data){
		users.push(data.user);
		socket.emit('success', {current_user : data.user, messages : messages})
	})
	socket.on('input_message', function(data){
		messages.push(data);
		socket.emit('updated_message', {
			new_message : data.message,
			user : data.user,
			messages : messages})
	})
})