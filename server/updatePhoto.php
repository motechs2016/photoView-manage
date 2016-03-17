<?php
	$con = new mysqli("localhost","root","123456","photo_manage");

	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	$img_id = $_POST['img_id'];
	$password = $_POST['password'];
	if(isset($_POST['type']) && $_POST['type'] == "delete") {
		$album_query = mysqli_query($con,"SELECT album FROM photo WHERE id='$img_id'");
		$album_row = mysqli_fetch_array($album_query);
		$album_id = $album_row['album'];
		$num_query = mysqli_query($con,"SELECT * FROM album WHERE id='$album_id'");
		$num_row = mysqli_fetch_array($num_query);
		if($password != $num_row['pwd']) {
			//echo($password);
			echo("PWD_ERROR");
			exit();
		} else{
			echo ("INPUT_OK");
			$photo_num = $num_row['num']-1;
			mysqli_query($con,"UPDATE album SET num='$photo_num' WHERE id='$album_id'");
			mysqli_query($con,"DELETE FROM photo WHERE id = '$img_id'");
		}
	}
	mysqli_close($con);
?>