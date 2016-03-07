<?php
	$con = new mysqli("localhost","root","123456","photo_manage");
	mysqli_query($con,"SET NAMES UTF8");  //声明使用utf-8
	if (mysqli_connect_errno()) {
		printf("connect failed\n");
		exit();
	}

	if($query = mysqli_query($con,"SELECT * FROM album")) {
		//printf(mysqli_num_rows($query));
		while($row=mysqli_fetch_array($query)){
			$tmp = array(
				'id' =>$row['id'],
				'name' =>$row['name'],
				'num' =>$row['num']
			);	
			$list[]=json_encode($tmp);
		}
		echo json_encode($list);
	}

	mysqli_close($con);
?>