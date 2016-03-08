<?php
	define('NAME_NULL','NAME_NULL');
	define('DISTINCT_NAME','DISTINCT_NAME');

	$con = new mysqli("localhost","root","123456","photo_manage");

	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	$album_name = $_POST['album'];
	if( $album_name == "") {
		printf("NAME_NULL");
		exit();
	}
	$query = mysqli_query($con,"SELECT 'id' FROM album");
	
	while($row=mysqli_fetch_array($query)){
		if($album_name == $row['name']) {
			printf("DISTINCT_NAME");
			exit();
		}
	}

	$album_id = mysqli_num_rows($query);    //id即为元组的数目
	$sql = "INSERT INTO album(id, name, num) VALUES ('$album_id','$album_name','0')";
	mysqli_query($con,$sql);

	mysqli_close($con);
?>