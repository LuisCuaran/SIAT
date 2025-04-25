<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

require("../conexion.php");

$con = "SELECT id_ordentrabajo, fecha, estado, descripcion, fo_cliente FROM orden_trabajo ORDER BY fecha";
$res = mysqli_query($conexion, $con);

if (!$res) {
    echo json_encode(["error" => "Error en la consulta SQL"]);
    exit;
}

$vec = array();
while ($reg = mysqli_fetch_assoc($res)) {
    $vec[] = $reg;
}

// Elimina espacios en blanco antes/después del JSON
echo trim(json_encode($vec, JSON_UNESCAPED_UNICODE));
?>
