<?php
	require 'php-sdk/autoload.php';
	require_once 'config.php';

	use Qiniu\Auth;

	
    $accessKey = Config::ACCESS_KEY;
    $secretKey = Config::SECRET_KEY;

    $auth = new Auth($accessKey, $secretKey);

    $bucket = Config::BUCKET_NAME;
    $upToken = $auth->uploadToken($bucket);

    echo json_encode($upToken);

?>



