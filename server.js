var express = require('express');
var app = express();
var path = require('path');

// Define the port to run on
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
    socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
