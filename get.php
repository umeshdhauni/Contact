<?php
$connect = mysqli_connect("localhost","root","14021997","contactdetails");
$result = mysqli_query($connect, "SELECT * FROM contact");
$data = array();
while( $row = mysqli_fetch_array($result)){
	$data[]= $row;
}
print json_encode($data);
?>