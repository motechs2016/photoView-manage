<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	//$ablum = intval($_POST['ablum']);
	printf($_POST["ablum"]);
	$query = mysqli_query($con,"SELECT * FROM album");
	//printf($query.length);

	mysqli_close($con);
?>