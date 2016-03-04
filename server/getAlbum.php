<?php
	$con=mysql_connect("localhost","root","123456");
	mysql_select_db("photo_manage");
	mysql_query("SET NAMES UTF8");
	$result = mysql_query("select * from album");
	echo json_encode($list);