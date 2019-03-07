<?php
header("Access-Control-Allow-Origin: *");
require_once 'modules/getid3/getid3.php';
require "utils/ConnectionDB.php";
require "router/router.php";

$connection = connectionDataBase(); //Récupérer la connection à la bdd
createDataBase($connection); //Creer la BDD

$dir = "D:\Musique\Autre";
// peopleDataBase($connection, $dir); // Peuple la bdd avec un répertoire de musiques.
