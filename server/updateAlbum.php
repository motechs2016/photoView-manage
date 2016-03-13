<?php
	$con = new mysqli("localhost","root","123456","photo_manage");

	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	$pri_name = $_POST['pri_name'];
	if( isset($_POST['new_name']) ){
		$new_name = $_POST['new_name'];
	}
	
	$pri_pwd = $_POST['pri_pwd'];
	if( isset($_POST['new_pwd']) ) {
		$new_pwd = $_POST['new_pwd'];
	}
	if( isset($_POST['type']) ) {
		$type = $_POST['type'];
	}
	
	$pri_query = mysqli_query($con,"SELECT * FROM album WHERE name = '$pri_name'");
	$pri_row = mysqli_fetch_array($pri_query);

	if($pri_pwd != $pri_row['pwd']) {
		echo("PWD_ERROR");
		exit();
	}else if($type == "delete") {
		echo ("INPUT_OK");
		$name = $pri_row['name'];
		$del_album = mysqli_query($con,"SELECT id FROM album WHERE name = '$name'");
		$del_row = mysqli_fetch_array($del_album);
		$del_id = $del_row['id'];
		mysqli_query($con,"DELETE FROM photo WHERE album = '$del_id'");
		$sql_del = "DELETE FROM `album` WHERE name = '$name' ";
		mysqli_query($con,$sql_del);
	}else {
		if( $new_name == "") {     //新名字为空
			echo ("NAME_NULL");
			exit();
		}
		$query = mysqli_query($con,"SELECT * FROM album");
		
		while($row=mysqli_fetch_array($query)){
			if($new_name == $row['name'] && $pri_name != $row['name']) {    //新名字重复
				echo ("DISTINCT_NAME");
				exit();
			}
		}
		echo ("INPUT_OK");

		if( $new_pwd ) {
			$password = $new_pwd;
		}else {
			$password = $pri_pwd;
		}
		$album_id = $pri_row['id'];
		$sql_update = "UPDATE album SET name='$new_name',pwd='$password' WHERE id='$album_id'";
		mysqli_query($con,$sql_update);
	}

	mysqli_close($con);
?>