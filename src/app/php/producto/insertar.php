<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");


$json = file_get_contents("php://input"); // se comenta para hacer pruebas

$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
//$ins = "insert into producto(id_producto, nombre, descripcion, precio, stock) values ('3', 'diafragma', 'ybr 125', '15000', '4')"; 

$ins = "insert into producto(nombre, descripcion, precio, stock) values ('$params->nombre', '$params->descripcion', '$params->precio', '$params->stock')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje ='Producto Registrado';

header('Content-Type: application/json');
echo json_encode($response);

?>
