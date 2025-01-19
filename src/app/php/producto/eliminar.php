<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");


require("../conexion.php");

$del = "DELETE FROM producto WHERE id_producto=".$_GET['id'];

mysqli_query($conexion,$del) or die("no elimino");

class Result {}

$response = new Result();
$response->resultado= 'OK';
$response->mensaje = 'Producto Eliminado';

header('Content-Type: application/json');
echo json_encode($response);

?>