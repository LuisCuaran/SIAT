<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$con = "SELECT * FROM compra ORDER BY fecha";

$res = mysqli_query($conexion, $con) or die("No se pudo consultar compra");

$vec = array();

while ($reg = mysqli_fetch_array($res)) {
    $vec[] = $reg;
}

// Convertir el array a formato JSON
$cad = json_encode($vec);

// Establecer el tipo de contenido como JSON
header("Content-Type: application/json");

// Imprimir el resultado JSON
echo $cad;
?>