<?php
$connect = mysqli_connect("localhost","root","14021997","contactdetails");
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$result = mysqli_query($connect, "DELETE FROM contact WHERE phone='$id'");
?>