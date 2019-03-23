<?php

use PHPRouter\Router;
$app = new Router();

$app->get('/', function ($request, $response) {
    $response->json(["title" => "Titre en PHP", "description" => "Description en php"], 200);
});

$app->get('/reset', function ($request, $response) {
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    resetDataBase($connection); //Supprime toutes les tables
    createDataBase($connection); //Creer la BDD
    
    $dir = "../MusicService/musiques";
    peopleDataBase($connection, $dir); // Peuple la bdd avec un répertoire de musiques.
});

$app->get('/musiques', function ($request, $response) {
    $response->send(getMusic());
});

$app->get('/PeopleHard', function ($request, $response) {
    $response->send(peopleDataBaseHard());
});

$app->get('/musiques/:id', function ($request, $response) {
    $response->send(getMusicById($request["params"]["id"]));
});

$app->get('/playlists', function ($request, $response) {
    $response->send(getPlaylist());
});

$app->post('/playlists', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createPlaylist($json->title));
});

$app->delete('/playlists/:id', function ($request, $response) {
    $response->send(deletePlaylistById($request["params"]["id"]));
});

$app->get('/playlists/:id', function ($request, $response) {
    $response->send(getPlaylistById($request["params"]["id"]));
});

$app->get('/playlists/:id_p/musiques/:id_m', function ($request, $response) {
    $response->send(putMusiqueInPlaylistById($request["params"]["id_p"],$request["params"]["id_m"]));
});



// $app->any('/getAllMusic', function ($request, $response) {
//     $response->send("ANY request");
// });
// $app->get('/user', function ($request, $response) {
//     $response->json(["id" => "1", "name" => "DroidHat", "url" => "http://www.droidhat.com"], 200);
// });
// $app->post('/:id', function ($request, $response) {
//     $response->json(["id" => ($request["params"]["id"])], 200);
// });
// $app->post('/:id/:name', function ($request, $response) {
//     $response->json(["id" => ($request["params"]["id"]), "name" => ($request["params"]["name"])], 200);
// });
// $app->put('/', function ($request, $response) {
//     $response->send("PUT request");
// });
// $app->patch('/', function ($request, $response) {
//     $response->send("PATCH request");
// });
// $app->delete('/', function ($request, $response) {
//     $response->send("DELETE request");
// });
// $app->error(function (Exception $e, $response) {
//     $response->send('path not found', 404);
// });

$app->start();
