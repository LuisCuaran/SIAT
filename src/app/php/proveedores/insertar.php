<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents("php://input"); // se comenta para hacer pruebas

$params = json_decode($json); // se comenta para hacer pruebas

require("../conexion.php");

// Consulta corregida
//$ins = "insert into proveedores(nombre, direccion, telefono, email) values ('Ramirez Hermanos', 'calle5 N14-25', '3243567893', 'ramirez@gmail.com')"; 

$ins = "insert into proveedores(nombre, direccion, telefono, email) values ('$params->nombre', '$params->direccion', '$params->telefono', '$params->email')"; // se comenta para hacer pruebas

mysqli_query($conexion, $ins) or die('no inserto');

class Result {}

$response = new Result();
$response->resultado = 'ok';
$response->mensaje ='datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
