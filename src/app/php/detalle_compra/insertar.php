<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");


$json = file_get_contents("php://input"); // se comenta para hacer pruebas

$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
//$ins = "insert into detallecompra(cantidad,`precioTotal`,fo_producto, fo_compra) values ('2', '20000', '7','3')"; 

$ins = "insert into detallecompra(cantidad,precioTotal,fo_producto, fo_compra) values ('$params->cantidad', '$params->precioTotal', '$params->fo_producto','$params->fo_compra')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje ='datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
