<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}

	$photo_src = $_POST['src'];
	$album_name = $_POST['name'];
	$album_query = mysqli_query($con,"SELECT * FROM album WHERE name = '$album_name'");
	$album_row = mysqli_fetch_array($album_query);
	$album_id = $album_row['id'];

	$new_query = mysqli_query($con,"SELECT count(*) FROM photo");
	$new_id = mysqli_num_rows($new_query)[0];

	$new_name = $album_name."".$new_id;
	$up_sql = "INSERT INTO `photo`(id,album,name,src) VALUES ('$new_id','$album_id','$new_name','$photo_src')";
	mysqli_query($con,$up_sql);
	mysqli_close($con);
?>