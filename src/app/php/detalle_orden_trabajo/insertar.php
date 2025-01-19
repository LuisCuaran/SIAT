<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

//$json = file_get_contents("php://input"); // se comenta para hacer pruebas

//$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
$ins = "insert into detalleorden(cantidad, fo_ordentrabajo, fo_producto) values ('3', '2', '7')"; //se descomenta para hacer pruebas

//$ins = "insert into detalleorden(cantidad, fo_ordentrabajo, fo_producto) values ('$params->cantidad', '$params->fo_ordentrabajo', '$params->fo_producto')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje = 'datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
