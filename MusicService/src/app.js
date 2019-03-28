const bodyParser = require('body-parser')
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Every new streamer must have the buffer header from the presenter
var bufferHeader = null;
var saveStat = "stopped";
// Event listener
var table = [];
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

    // Broadcast the received buffer
    socket.on('UserVoice', function (id) {
        var include = false;
        for (let index = 0; index < table.length; index++) {
            if (table[index].user_id == id) {
                include = true;
                table[index].socket_id = socket.id;
            }         
        }
        if (include == false) {
            var user = {
                socket_id : socket.id,
                user_id : id
            }
            table.push(user);
        }
        socket.broadcast.emit('updateUser',table)
    });

    // Send buffer header to new user
    socket.on('requestBufferHeader', function () {
        socket.emit('bufferHeader', bufferHeader);
    });

    timer.on('statusChanged', (status) => {
        // Lors de la fin d'une musique
        if (status == 'stopped' && saveStat != status) {
            console.log('stopped : ', status)
            saveStat = status
            resetParams()
            startMusic()
        }
        if (status == 'running' && saveStat != status) {
            console.log('running : ', status)
            saveStat = status
            socket.broadcast.emit('update')
        }
    })

    socket.on('stop', function () {
        //Ferme toutes des balises audios chez les clients
        arrayOfWaitingMusicForPlay = [];
        musicIsPlay = null;
        resetParams()
        timer.stop()
        socket.broadcast.emit('stop', '')
    });

    // Quand on arrete le serveur.
    process.on('SIGINT', function () {
        // Stop toutes les musiques de tous les clients
        socket.broadcast.emit('stop');
        console.log('Arrêt du service "music".');
    });
    process.setMaxListeners(0);
});

var arrayOfWaitingMusicForPlay = [];
var musicIsPlay = [];

let timer = new Timer()
timer.on('tick', (ms) => onEverySecond()) //S'execute toutes les secondes

let start = 0;  //Lorsque utilisateur va reprendre le flux musical, mettre la au meme niveau que tout le monde. Incrémentation toutes les secondes jusqu'à la fin de la musique de 'onePart'
let onePart = 0;// Taille en buffer d'une partie du fichier de la musique : (buffer de toute la musique) / (temps en seconde de la musique)

// Rend la musique disponible sur la page localhost:8081/
app.get('/', (req, res) => {
    if (musicIsPlay) {
        var fichier = musicIsPlay.filepath
        var rs = fs.createReadStream(fichier, { 'flags': 'r', 'start': start })
        res.writeHead(200, { 'Content-Type': 'audio/mpeg' })
        rs.pipe(res)
    }
})

// Get Array : Invités log
app.get('/Invite', (req, res) => {
    res.send({ invites: table })
})

// Get Array : Musique en cours
app.get('/Playing', (req, res) => {
    res.send({ isPlaying: musicIsPlay })
})

// Get Array : Musique en attente
app.get('/Waiting', (req, res) => {
    res.send({ waiting: arrayOfWaitingMusicForPlay })
})

// Get Array : Musique en attente + en cours
app.get('/WaitingAndPlaying', (req, res) => {
    res.send({ isPlaying: musicIsPlay, waiting: arrayOfWaitingMusicForPlay })
})

// Post Array : Actualisation de la liste des musiques
app.post('/list', (req, res) => {
    arrayOfWaitingMusicForPlay = [];
    arrayOfWaitingMusicForPlay = JSON.parse(req.body.list);
    if (timer.status == 'stopped') {
        startMusic()
    }
})

// Permet de demarrer de maniere factice la musique
var startMusic = () => {
    if (arrayOfWaitingMusicForPlay.length != 0) {
        musicIsPlay = arrayOfWaitingMusicForPlay[0];
        console.log('Loading Music : ' + musicIsPlay.titre)
        arrayOfWaitingMusicForPlay.splice(0, 1);
        var fichier = musicIsPlay.filepath;
        let fileSize = fs.statSync(fichier).size
        mp3Duration(fichier, function (err, duration) {
            time = Math.round(duration)
            onePart = fileSize / time
            timer.start(time * 1000)
        });
    }
}

// Toutes les secondes on incrémente le départ de la musique si un autre client vient à écouter
var onEverySecond = () => {
    start += onePart
}

//Remise à zero des variables en préparation d'une nouvelle musique à diffuser
var resetParams = () => {
    musicIsPlay = []
    start = 0
    onePart = 0
}

http.listen(8081, () => console.log('listening on port 8081'))