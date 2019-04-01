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

$app->get('/plannings', function ($request, $response) {
    $response->send(getPlannings());
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

$app->put('/playlists', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(putPlaylistById($json->id,$json->liste));
});

$app->delete('/playlists/:id', function ($request, $response) {
    $response->send(deletePlaylistById($request["params"]["id"]));
});

$app->get('/playlists/:id', function ($request, $response) {
    $response->send(getPlaylistById($request["params"]["id"]));
});

$app->post('/login', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(getUserByLogin($json->email, $json->mdp));
});

$app->post('/podcast', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createPodcast($json->titre, $json->descr, $json->uuid, $json->duree));
});

$app->post('/podcast/file/:uuid', function ($request, $response) {
    if (0 < $_FILES['file']['error']) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    } else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'D:/Musique/Podcast/'.$request["params"]["uuid"].'.mp3');
    }
});

$app->post('/signup', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(createUser($json->email, $json->nom, $json->prenom, $json->mdp));
});

$app->get('/podcasts', function ($request, $response) {
    $json = json_decode($request['raw']);
    $response->send(getPodcast());
});


$app->start();
