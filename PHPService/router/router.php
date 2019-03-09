<?php

use PHPRouter\Router;
$app = new Router();

$app->get('/', function ($request, $response) {
    $response->json(["title" => "Titre en PHP", "description" => "Description en php"], 200);
});

$app->get('/Musiques', function ($request, $response) {
    $response->send(getMusic());
});

$app->get('/Musiques/:id', function ($request, $response) {
    $response->send(getMusicById($request["params"]["id"]));
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
