/* eslint-disable */
const os = require('os')
const fs = require('fs')

var list = os.networkInterfaces()
var iplocal = list['Wi-Fi'][1]['address']
json = `{
    "service": {
        "music": {
            "_comment": "Service de gestion pour la diffusion des musiques et des streams en direct. PORT 8081",
            "URL": "` + iplocal + `:8081"
        },
        "dataBase": {
            "_comment": "Service d'authentification & gestion des musiques en BDD. PORT 3000",
            "URL": "` + iplocal + `:3000"
        }
    }
}`;

fs.writeFile("src/config/config.json", json, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved with ip : " + iplocal);
});