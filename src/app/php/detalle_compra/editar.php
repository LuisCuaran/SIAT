<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

//$json = file_get_contents('php://input');//comentar para prueba


//$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
$id_detallecompra = 1; // Cambia este ID según los datos existentes en tu base
$cantidad = "3"; $precioTotal = "30000";$fo_producto= "6";$fo_compra= "3";//descomentar para prueba

// Consulta SQL para prueba
$editar = "UPDATE detallecompra  SET cantidad = '$cantidad', precioTotal = '$precioTotal', fo_producto = '$fo_producto', fo_compra = '$fo_compra' WHERE id_detallecompra = $id_detallecompra";//descomentar para prueba

//$editar = "UPDATE compra SET fecha='$params->fecha', total='$params->total', fo_proveedores='$params->fo_proveedores' WHERE id_compra=$params->id_compra";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);