<?php

function connectionDataBase()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music";
    $connection = null;

    try {
        $connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
    }

    return $connection;
}

function resetDataBase($connection)
{
    try {
        $sql = "DROP TABLE musique";
        $connection->exec($sql);

    } catch (PDOException $e) {
    }
}

function createDataBase($connection)
{
    try {
        $sql = "CREATE TABLE musique (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(3000) DEFAULT NULL,
            album VARCHAR(3000) DEFAULT NULL,
            genre VARCHAR(3000) DEFAULT NULL,
            artist VARCHAR(3000) DEFAULT NULL,
            annee VARCHAR(3000) DEFAULT NULL,
            duree VARCHAR(3000) DEFAULT NULL
            )";
        $connection->exec($sql);

    } catch (PDOException $e) {
    }
    try {
        $sql = "CREATE TABLE user (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            mdp VARCHAR(3000) NOT NULL,
            email VARCHAR(3000) NOT NULL,
            nom VARCHAR(3000) NOT NULL,
            prenom VARCHAR(3000) NOT NULL,
            pseudo VARCHAR(3000) NOT NULL
            )";
        $connection->exec($sql);

    } catch (PDOException $e) {
    }
}

function peopleDataBase($connection, $dir)
{
    $files = scandir($dir);
    $getID3 = new getID3();

    for ($i = 2; $i < count($files); $i++) {
        $ThisFileInfo = $getID3->analyze($dir . "/" . $files[$i]);

        $titre = " ";
        $album = " ";
        $genre = " ";
        $artist = " ";
        $annee = " ";
        $duree = " ";
        if (isset($ThisFileInfo['tags']['id3v2']['album'])) {

            $album = implode(",", $ThisFileInfo['tags']['id3v2']['album']);
        }
        if (isset($ThisFileInfo['tags']['id3v2']['genre'])) {
            $genre = implode(",", $ThisFileInfo['tags']['id3v2']['genre']);
        }
        if (isset($ThisFileInfo['tags']['id3v2']['artist'])) {
            $artist = implode(",", $ThisFileInfo['tags']['id3v2']['artist']);
        }
        if (isset($ThisFileInfo['tags']['id3v2']['year'])) {
            $annee = implode(",", $ThisFileInfo['tags']['id3v2']['year']);
        }
        if (isset($ThisFileInfo['playtime_string'])) {
            $duree = $ThisFileInfo['playtime_string'];
        }
        if (isset($ThisFileInfo['filename'])) {
            $titre = $ThisFileInfo['filename'];
        }

        try {
            $sql = "INSERT INTO musique (titre, album, genre, artist, annee, duree) VALUES (\"$titre\",\"$album\",\"$genre\",\"$artist\",\"$annee\",\"$duree\")";
            $connection->exec($sql);
        } catch (PDOException $e) {
            echo $e . "<br>";
        }
    }
}
