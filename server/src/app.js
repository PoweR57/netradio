const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app);

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
    console.log("fdp");
    res.send(
        [{
            title: "Hello World!",
            description: "Hi there! How are you?"
        }]
    )
})

var io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(process.env.PORT || 8081);

// Every new streamer must have the buffer header from the presenter
var bufferHeader = null;

// Event listener
io.on('connection', function (socket) {
    /* Presenter */
    socket.on('bufferHeader', function (packet) {
        // Buffer header can be saved on server so it can be passed to new user
        bufferHeader = packet;
        socket.broadcast.emit('bufferHeader', packet);
        console.log("salut")
    });

    // Broadcast the received buffer
    socket.on('stream', function (packet) {
        socket.broadcast.emit('stream', packet);
        console.log("salut")
    });

    // Send buffer header to new user
    socket.on('requestBufferHeader', function () {
        socket.emit('bufferHeader', bufferHeader);
        console.log("salut")
    });
});