<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_compra = 3; // Cambia este ID según los datos existentes en tu base
//$fecha = "2024-01-09"; $total = "10000";$fo_proveedores= "1";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE compra  SET fecha = '$fecha', total = '$total', fo_proveedores = '$fo_proveedores' WHERE id_compra = $id_compra";//descomentar para prueba

$editar = "UPDATE compra SET fecha='$params->fecha', total='$params->total', fo_proveedores='$params->fo_proveedores' WHERE id_compra=$params->id_compra";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);