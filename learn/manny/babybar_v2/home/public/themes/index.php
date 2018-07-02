<?php
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header("Content-type: text/css");
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (empty($_GET['theme'])) {
	echo '';
	exit;
}

$theme = file_get_contents($_GET['theme'].'/bootstrap.min.css');
echo $theme;
exit;
?>