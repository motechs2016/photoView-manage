<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}

	$album_name = $_POST['name'];
	if( $album_name == "ALL") {           //如果要取出所有图片
		$photo_query = mysqli_query($con,"SELECT * FROM photo ORDER BY ABS(id)");
		$all_list = array();
		while($all_row = mysqli_fetch_array($photo_query)) {
			$all_tmp = array(
				'src' =>$all_row['src'],
				'name' =>$all_row['name'],
			);
			$all_list[]=json_encode($all_tmp);
		}
		if($all_list) {
			echo json_encode($all_list);
		}
	}else {
		$album_query = mysqli_query($con,"SELECT * FROM album WHERE name = '$album_name'");
		$album_row = mysqli_fetch_array($album_query);
		$album_id = $album_row['id'];
		$album_num = $album_row['num'];

		if($query = mysqli_query($con,"SELECT * FROM photo WHERE album = '$album_id' ORDER BY ABS(id)")) {
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
	}
	mysqli_close($con);
?>