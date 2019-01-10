var express = require('express');
var app = express();
var server = require('http').createServer(app); 
var bodyParser = require('body-parser');


app.use(express.static('./public'));

app.use('/', require('./routes/route'));

app.set("view engine", "twig");
app.set("views", "./src/views");

/*app.listen(3000, function () {
    console.log('Express app listening on port 3000');
});*/

var io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(3000);
  
  // Every new streamer must have the buffer header from the presenter
  var bufferHeader = null;
  
  // Event listener
  io.on('connection', function(socket){
      /* Presenter */
      socket.on('bufferHeader', function(packet){
          // Buffer header can be saved on server so it can be passed to new user
          bufferHeader = packet;
          socket.broadcast.emit('bufferHeader', packet);
      });
  
      // Broadcast the received buffer
      socket.on('stream', function(packet){
          socket.broadcast.emit('stream', packet);
      });
  
      // Send buffer header to new user
      socket.on('requestBufferHeader', function(){
          socket.emit('bufferHeader', bufferHeader);
      });
  });
