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

    //Socket de reception de la musique à diffuser instantanément
    socket.on('playMusic', function (name) {
        if (timer.status == 'running') {
            resetParams()
            timer.stop()
        }

        file = './musiques/' + name

        startMusic()

        //Acualisation des balises audios chez les clients
        socket.broadcast.emit('update', '')
    });

    socket.on('stop', function () {
        //Ferme toutes des balises audios chez les clients
        socket.broadcast.emit('stop', '')
    });

    socket.on('close', function (exception) {
        socket.disconnect()
    });

    // Quand on arrete le serveur.
    process.on('SIGINT', function () {
        // Stop toutes les musiques de tous les clients
        socket.broadcast.emit('stop');
        console.log('Arrêt du service "music".');
    });
    process.setMaxListeners(0);
});



let timer = new Timer()
timer.on('tick', (ms) => onEverySecond()) //S'execute toutes les secondes
timer.on('done', () => resetParams()) //Une fois le timer terminé. (Il a fait tout le temps de la musique)
timer.on('statusChanged', (status) => onChangeStatus(status))


let file = null //Nom du fichier de musique qui sera diffusé
let start = 0;  //Lorsque utilisateur va reprendre le flux musical, mettre la au meme niveau que tout le monde. Incrémentation toutes les secondes jusqu'à la fin de la musique de 'onePart'
let onePart = 0;// Taille en buffer d'une partie du fichier de la musique : (buffer de toute la musique) / (temps en seconde de la musique)

// Rend la musique disponible sur la page localhost:8081/
app.get('/', (req, res) => {
    if (file) {
        var rs = fs.createReadStream(file, { 'flags': 'r', 'start': start })
        res.writeHead(200, { 'Content-Type': 'audio/mpeg' })
        rs.pipe(res)
    }
})

// Permet de demarrer de maniere factice la musique
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

// Appelé lorsque qu'une musique démarre ou se termine
var onChangeStatus = (status) => {
    console.log('status:', status)

    // Lors de la fin d'une musique
    if (status == 'stopped') {
        resetParams()
    }
}

//Remise à zero des variables en préparation d'une nouvelle musique à diffuser
var resetParams = () => {
    file = null
    start = 0
    onePart = 0
}



http.listen(8081, () => console.log('listening on port 8081'))