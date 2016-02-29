<?php
	require 'php-sdk/autoload.php';
	require_once 'config.php';

	use Qiniu\Auth;

	$bucket = Config::BUCKET_NAME;
    $accessKey = Config::ACCESS_KEY;
    $secretKey = Config::SECRET_KEY;

    $auth = new Auth($accessKey, $secretKey);
    $upToken = $auth->uploadToken($bucket);

    $ret = array('uptoken' => $upToken);
    print "hello";

    echo json_encode($ret);
?>