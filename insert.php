<?php
$data = json_decode(file_get_contents("php://input"));
$name = mysql_real_escape_string($data->name);
$phone = $data->phone;
$email = $data->email;
$age = $data->age;
$image=$data->image;
define("DB_HOST", "localhost");
	define("DB_NAME", "contactdetails");
	define("DB_USER", "root");
	define("DB_PASSWORD", "14021997");
	$con=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
	$db=mysql_select_db(DB_NAME,$con)  
	or die("Failed to connect to MySQL:".mysql_error());
	$query="INSERT INTO contact(name,phone,email,age,image) VALUES('$name','$phone','$email','$age','$image')";
	$contactdata=mysql_query($query)
	or die(mysql_error());
	if($contactdata){
		echo "Sucessfully Registered ".$name;
	}
?>