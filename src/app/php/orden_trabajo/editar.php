<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');//comentar para prueba


$params = json_decode($json);//comentar para prueba

require("../conexion.php");

// Valores predeterminados para la prueba
//$id_ordentrabajo = 3; // Cambia este ID según los datos existentes en tu base
//$fecha = "2025-01-12"; $estado = "Activo";$descripcion= "Instalacion de los repuestos";$fo_cliente= "6";//descomentar para prueba

// Consulta SQL para prueba
//$editar = "UPDATE orden_trabajo SET fecha = '$fecha', estado = '$estado', descripcion = '$descripcion', fo_cliente='$fo_cliente' WHERE id_ordentrabajo = $id_ordentrabajo";//descomentar para prueba

$editar = "UPDATE orden_trabajo SET fecha='$params->fecha', estado='$params->estado', descripcion='$params->descripcion', fo_cliente= '$params->fo_cliente' WHERE id_ordentrabajo=$params->id_ordentrabajo";//comentar para prueba


mysqli_query($conexion, $editar) or die('no edito');

class Result {}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);