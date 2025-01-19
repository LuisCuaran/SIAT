<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_proveedores = 2; // Cambia este ID según los datos existentes en tu base
//$nombre = "Carbupartes"; $direccion = "san victorino";$telefono= "3215678675";$email= "carbupartes@gmail.com";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE proveedores  SET nombre = '$nombre', direccion = '$direccion', telefono = '$telefono', email='$email' WHERE id_proveedores = $id_proveedores";//descomentar para prueba

$editar = "UPDATE proveedores SET nombre='$params->nombre', direccion='$params->direccion', telefono='$params->telefono', email= '$params->email' WHERE id_proveedores=$params->id_proveedores";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);