<?php
	$con = new mysqli("localhost","root","123456","photo_manage");

	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	$album_name = $_POST['album'];
	$album_pwd = $_POST['pwd'];

	if( $album_name == "") {
		echo ("NAME_NULL");
		exit();
	}
	$query = mysqli_query($con,"SELECT * FROM album");
	
	while($row=mysqli_fetch_array($query)){
		if($album_name == $row['name']) {
			echo ("DISTINCT_NAME");
			exit();
		}
	}

	echo ("INPUT_OK");

	$album_id = mysqli_num_rows($query);    //id即为元组的数目
	$sql = "INSERT INTO album(id, name, pwd, num) VALUES ('$album_id','$album_name','$album_pwd','0')";
	mysqli_query($con,$sql);



	mysqli_close($con);
?>