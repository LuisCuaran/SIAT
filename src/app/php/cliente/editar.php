<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_cliente = 6; // Cambia este ID según los datos existentes en tu base
//$nombre = "Luis Cuaran"; $direccion = "carrera 18 # 41-61";$telefono = "3107643370"; $email = "prueba3@example.com";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE cliente  SET nombre = '$nombre', direccion = '$direccion', telefono = '$telefono', email = '$email' WHERE id_cliente = $id_cliente";//descomentar para prueba

$editar = "UPDATE cliente SET nombre='$params->nombre', direccion='$params->direccion', telefono='$params->telefono', email='$params->email' WHERE id_cliente=$params->id_cliente";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);