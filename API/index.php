<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-type: application/json");



$result = array();
$code = $_GET["code"];

if ($_SERVER['REQUEST_METHOD'] === "GET") {
        
    $result["success"]=true;
    $result["message"]="Request success";
    $result["results"]["count"]=0;
    $result["results"]["data"]="";
    if (!isset($code)){
        header('X-PHP-Response-Code: 200', true, 200);
    }
    else {
        header('X-PHP-Response-Code: ' . $code, true, $code);
    }
}

//UNSUPPORTED VERB
if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
    $result["success"]=false;
    $result["message"]="Not supported";
    $result["results"]="";
    header('X-PHP-Response-Code: 500', true, 500);
}


echo json_encode($result);

?>