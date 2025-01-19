<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_ventas= 1; // Cambia este ID según los datos existentes en tu base
//$fecha = "2025-01-15"; $total = "90000";$fo_cliente= "6";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE ventas  SET fecha = '$fecha', total = '$total', fo_cliente = '$fo_cliente' WHERE id_ventas = $id_ventas";//descomentar para prueba

$editar = "UPDATE ventas SET fecha='$params->fecha', total='$params->total', fo_cliente='$params->fo_cliente' WHERE id_ventas=$params->id_ventas";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);