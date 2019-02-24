const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const fs = require('fs')
const mp3Duration = require('mp3-duration')
const Timer = require('tiny-timer')

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

// Every new streamer must have the buffer header from the presenter
var bufferHeader = null;

// Event listener
io.on('connection', function (socket) {

    /* Presenter */
    socket.on('bufferHeader', function (packet) {
        // Buffer header can be saved on server so it can be passed to new user
        bufferHeader = packet;
        socket.broadcast.emit('bufferHeader', packet);
    });

    // Broadcast the received buffer
    socket.on('stream', function (packet) {
        socket.broadcast.emit('stream', packet);
    });

    // Send buffer header to new user
    socket.on('requestBufferHeader', function () {
        socket.emit('bufferHeader', bufferHeader);
    });

    socket.on('playMusic', function (name) {
        if (timer.status == 'running') {
            resetParams()
            timer.stop()
        }

        file = './musiques/' + name

        startMusic()
        socket.broadcast.emit('update', '')
    });

    socket.on('stop', function () {
        socket.broadcast.emit('stop', '')
    });

    socket.on('close', function (exception) {
        socket.disconnect()
    })
});

http.listen(8081, () => console.log('listening on port 8081'))




let timer = new Timer()
timer.on('tick', (ms) => onEverySecond())
timer.on('done', () => resetParams())
timer.on('statusChanged', (status) => onChangeStatus(status))


let file = null
let start = 0;
let onePart = 0;

app.get('/', (req, res) => {
    if (file) {
        var rs = fs.createReadStream(file, { 'flags': 'r', 'start': start })
        res.writeHead(200, { 'Content-Type': 'audio/mpeg' })
        rs.pipe(res)
    }
})

var startMusic = () => {
    let fileSize = fs.statSync(file).size
    mp3Duration(file, function (err, duration) {
        time = Math.round(duration)
        onePart = fileSize / time
        timer.start(time * 1000)
    });
}

// Toutes les secondes on incrémente le départ de la musique si un autre client vient à écouter
var onEverySecond = () => {
    start += onePart
}

var onChangeStatus = (status) => {
    console.log('status:', status)
    if (status == 'stopped') {
        resetParams()
    }
}

var resetParams = () => {
    file = null
    start = 0
    onePart = 0
}