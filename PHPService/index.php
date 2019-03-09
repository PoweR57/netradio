<?php
header("Access-Control-Allow-Origin: *");
require 'modules/getid3/getid3.php';
require "modules/PHPRouter/Router.php";
require "DB/ConnectionDB.php";
require "DB/RequestDB.php";
require "router/router.php";

$connection = connectionDataBase(); //Récupérer la connection à la bdd
resetDataBase($connection); //Supprime toutes les tables
createDataBase($connection); //Creer la BDD

$dir = "../MusicService/musiques";
peopleDataBase($connection, $dir); // Peuple la bdd avec un répertoire de musiques.