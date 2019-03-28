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
    $response->send(createPlaylist($json->title, $json->descr));
});

$app->delete('/playlists/:id', function ($request, $response) {
    $response->send(deletePlaylistById($request["params"]["id"]));
});

$app->get('/playlists/:id', function ($request, $response) {
    $response->send(getPlaylistById($request["params"]["id"]));
});

$app->get('/playlists/:id_p/musiques/:id_m', function ($request, $response) {
    $response->send(putMusiqueInPlaylistById($request["params"]["id_p"], $request["params"]["id_m"]));
});

$app->post('/login', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(getUserByLogin($json->email, $json->mdp));
});

$app->post('/poadcast', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createPoadcast($json->titre, $json->descr, $json->uuid));
});

$app->post('/poadcast/file/:uuid', function ($request, $response) {
    if (0 < $_FILES['file']['error']) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    } else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'D:/Musique/Poadcast/'.$request["params"]["uuid"].'.mp3');
    }
});

$app->post('/signup', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createUser($json->email, $json->nom, $json->prenom, $json->mdp));
});

$app->start();
