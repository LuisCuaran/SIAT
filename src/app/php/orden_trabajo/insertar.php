<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input"); // se comenta para hacer pruebas

$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
//$ins = "insert into orden_trabajo(fecha, estado, descripcion, fo_cliente) values ('2024-01-10', 'activo', 'Reparacion de motor', '1')"; //descomenta para hacer prueba

$ins = "insert into orden_trabajo(fecha, estado, descripcion, fo_cliente) values ('$params->fecha', '$params->estado', '$params->descripcion', '$params->fo_cliente')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje ='datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
