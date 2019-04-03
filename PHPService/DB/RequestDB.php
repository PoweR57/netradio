<?php

// Transforme la response PDO en format json
function formatToJson($response)
{
    $results = $response->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    return $json;
}

function getMusic()
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM musique";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getMusicRandom()
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM musique ORDER BY RAND() LIMIT 10";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getAlbum()
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM album";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getMusicByAlbum($id)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM musique where id_album=" . $id. " ORDER BY titre";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getMusicById($id)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM musique where id=" . $id;
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getPlaylist()
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM playlist";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function getPlannings()
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM planning";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function createEvent($title, $start, $end, $id)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    try {
        $sql = "INSERT INTO planning (descr, date_debut,date_fin,id_animateur) values ('$title', '$start', '$end', '$id')";
        $connection->query($sql);
    } catch (PDOException $e) {
        echo $e;
    }
}

function getPlaylistById($id)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "SELECT * FROM playlist where id=" . $id;
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function putPlaylistById($id, $liste)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $result = "";
    try {
        $sql = "UPDATE playlist set liste_musique=\"" . $liste . "\" where id=" . $id;
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}

function deletePlaylistById($id)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    try {
        $sql = "DELETE FROM playlist where id=" . $id;
        $connection->query($sql);
    } catch (PDOException $e) {
        echo $e;
    }
}

function createPlaylist($title, $descr)
{
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    try {
        $sql = "INSERT INTO playlist (title) values ('$title')";
        $connection->query($sql);
    } catch (PDOException $e) {
        echo $e;
    }
}

function getUserByLogin($email, $mdp)
{
    $connection = connectionDataBase();
    $result = "";
    try {
        $sql = "SELECT * FROM user where email=\"" . $email . "\"";
        $result = $connection->query($sql);
        foreach ($result as $res) {
            if (password_verify($mdp, $res['mdp'])){
                $token = bin2hex(random_bytes(50));
                $result = '{"token":"'.$token.'", "role":"'.$res['role'].'"}';
            }
        }
    }catch (PDOException $e){
        echo $e;
    }
    return $result;
}

function createUser($email, $nom, $prenom, $mdp)
{
    $connection = connectionDataBase();
    try {
        $mdp = password_hash($mdp, PASSWORD_BCRYPT);
        $sql = "INSERT INTO user (email,nom,prenom,mdp,role) values ('$email','$nom','$prenom','$mdp','auditeur')";
        $connection->query($sql);
    } catch (PDOException $e) {
        echo $e;
    }

}

function createPodcast($titre, $descr, $uuid, $duree)
{
    $connection = connectionDataBase();
    $filepath = "D:/Musique/Podcast/" . $uuid . ".mp3";
    try {
        $sql = "INSERT INTO podcast (titre,descr,filepath, duree) values ('$titre','$descr','$filepath','$duree')";
        $connection->query($sql);
    } catch (PDOException $e) {
        echo $e;
    }

}

function getPodcast()
{
    $connection = connectionDataBase();
    $result = '';
    try {
        $sql = "SELECT * FROM podcast";
        $result = $connection->query($sql);
        $result = formatToJson($result);
    } catch (PDOException $e) {
        echo $e;
    }
    return $result;
}
