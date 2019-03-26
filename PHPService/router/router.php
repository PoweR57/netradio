<?php

use PHPRouter\Router;
$app = new Router();

$app->get('/', function ($request, $response) {
    $response->json(["title" => "Titre en PHP", "description" => "Description en php"], 200);
});

$app->get('/albums', function ($request, $response) {
    $response->send(getAlbum());
});

$app->get('/albums/:id/musiques', function ($request, $response) {
    $response->send(getMusicByAlbum($request["params"]["id"]));
});

$app->get('/musiques', function ($request, $response) {
    $response->send(getMusic());
});

$app->get('/musiques/random', function ($request, $response) {
    $response->send(getMusicRandom());
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

$app->post('/playlist', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createPlaylist($json->title,$json->descr));
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

$app->post('/login', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(getUserByLogin($json->email,$json->mdp));
});

$app->post('/signup' ,function ($request, $response){
    $json = json_decode($request['raw']);
    $response->send(createUser($json->login,$json->nom,$json->prenom,$json->mdp));
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
