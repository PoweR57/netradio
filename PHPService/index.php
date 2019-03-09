<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

require 'modules/getid3/getid3.php';
require "modules/PHPRouter/Router.php";
require "DB/ConnectionDB.php";
require "DB/RequestDB.php";
require "router/router.php";