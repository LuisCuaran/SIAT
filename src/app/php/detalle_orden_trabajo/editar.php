<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_detalleorden = 4; // Cambia este ID según los datos existentes en tu base para editar
//$cantidad = "5"; $fo_ordentrabajo = "3";$fo_producto= "7";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE detalleorden  SET cantidad = '$cantidad', fo_ordentrabajo = '$fo_ordentrabajo', fo_producto = '$fo_producto' WHERE id_detalleorden = $id_detalleorden";//descomentar para prueba

$editar = "UPDATE detalleorden SET cantidad='$params->cantidad', fo_ordentrabajo='$params->fo_ordentrabajo', fo_producto='$params->fo_producto' WHERE id_detalleorden=$params->id_detalleorden";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);