<?php 

// Transforme la response PDO en format json
function formatToJson($response) {
    $results = $response->fetchAll(PDO::FETCH_ASSOC);
    $json= json_encode($results);
    return $json;
}

function getMusic() {
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $musiques = "";
    try {
        $sql = "SELECT * FROM musique";
        $musiques = $connection->query($sql);
        $musiques = formatToJson($musiques);
    } catch (PDOException $e) {
    }
    return $musiques;
}

function getMusicById($id) {
    $connection = connectionDataBase(); //Récupérer la connection à la bdd
    $oneMusique = "";
    try {
        $sql = "SELECT * FROM musique where id=" . $id;
        $oneMusique = $connection->query($sql);
        $oneMusique = formatToJson($oneMusique);
    } catch (PDOException $e) {
    }
    return $oneMusique;
}