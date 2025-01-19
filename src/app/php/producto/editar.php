<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_producto = 10; // Cambia este ID según los datos existentes en tu base
//$nombre = "pastillas D"; $descripcion = "Discover ST 125";$precio= "20000";$stock= "8";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE producto  SET nombre = '$nombre', descripcion = '$descripcion', precio = '$precio', stock='$stock' WHERE id_producto= $id_producto";//descomentar para prueba

$editar = "UPDATE producto SET nombre='$params->nombre', descripcion='$params->descripcion', precio='$params->precio', stock= '$params->stock' WHERE id_producto='$params->id_producto'";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);