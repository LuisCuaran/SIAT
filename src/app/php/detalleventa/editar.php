<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_detalleventa = 1; // Cambia este ID según los datos existentes en tu base
//$cantidad = "10"; $precioTotal = "70000";$fo_ventas= "1";$fo_producto= "10";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE detalleventa  SET cantidad = '$cantidad', precioTotal = '$precioTotal', fo_ventas = '$fo_ventas', fo_producto='$fo_producto' WHERE id_detalleventa = $id_detalleventa";//descomentar para prueba

$editar = "UPDATE detalleventa SET cantidad='$params->cantidad', precioTotal='$params->precioTotal', fo_ventas='$params->fo_ventas', fo_producto= '$params->fo_producto' WHERE id_detalleventa=$params->id_detalleventa";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);