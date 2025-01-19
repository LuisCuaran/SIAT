<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input"); // se comenta para hacer pruebas

$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
//$ins = "insert into ventas(fecha, total, fo_cliente) values ('2025-01-15', '50000', '6'),('2025-01-15', '40000', '4')"; //descomentar para pruebas, se hizo insercion de dos datos a la vez

$ins = "insert into ventas(fecha, total, fo_cliente) values ('$params->fecha', '$params->total', '$params->fo_cliente')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje ='datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
