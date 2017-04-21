<?php
$connect = mysqli_connect("localhost","root","14021997","contactdetails");
$data = json_decode(file_get_contents("php://input"));
$name = mysql_real_escape_string($data->name);
$phone = $data->phone;
$email = $data->email;
$age = $data->age;
$image=$data->image;
$id=$data->id;
$result = mysqli_query($connect, "UPDATE contact SET name='$name',phone='$phone',email='$email',image='$image',age='$age' WHERE id='$id'");
?>