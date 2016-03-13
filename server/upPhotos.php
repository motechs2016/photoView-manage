<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}

	$photo_src = $_POST['src'];
	$album_name = $_POST['album_name'];

	$photo_src = explode(",",$photo_src);
	
	$album_query = mysqli_query($con,"SELECT * FROM album WHERE name = '$album_name'");
	$album_row = mysqli_fetch_array($album_query);
	$album_id = $album_row['id'];
	$album_num = $album_row['num'];

	$num_query = mysqli_query($con,"SELECT count(*) FROM photo");
	if($res = mysqli_fetch_array($num_query)) {
		$new_id = $res[0];
	}else {
		$new_id = 0;
	}

	for($i=0;$i<count($photo_src);$i++) {
		//$new_name = $album_name."".$new_id;
		$new_name = $album_name;
		$up_sql = "INSERT INTO photo(id,album,name,src) VALUES ('$new_id','$album_id','$new_name','$photo_src[$i]')";
		mysqli_query($con,$up_sql);
		$new_id++;

		$tmp = array(
			'src' =>$photo_src[$i],
			'name' =>$new_name,
		);
		$list[]=json_encode($tmp);
	}

	$new_num = $album_num+count($photo_src);
	$update_sql = "UPDATE album SET num='$new_num' WHERE id='$album_id'";
	mysqli_query($con,$update_sql);
	
	if($list) {
		echo json_encode($list);
	} 
	mysqli_close($con);
?>