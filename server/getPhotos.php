<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}

	$album_name = $_POST['name'];
	$album_query = mysqli_query($con,"SELECT * FROM album WHERE name = '$album_name'");
	$album_row = mysqli_fetch_array($album_query);
	$album_id = $album_row['id'];

	if($query = mysqli_query($con,"SELECT * FROM photo WHERE album = '$album_id'")) {
		$list = array();
		while($row=mysqli_fetch_array($query)){
			$tmp = array(
				'src' =>$row['src'],
				'name' =>$row['name'],
			);	
			$list[]=json_encode($tmp);
		}
		if($list) {
			echo json_encode($list);
		} 
	}
	mysqli_close($con);
?>