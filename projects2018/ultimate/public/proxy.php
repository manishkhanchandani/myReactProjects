<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

function shapeSpace_block_proxy_visits() {
	$email = 'naveenkhanchandani@gmail.com';
	$headers = array('CLIENT_IP','FORWARDED','FORWARDED_FOR','FORWARDED_FOR_IP','VIA','X_FORWARDED','X_FORWARDED_FOR','HTTP_CLIENT_IP','HTTP_FORWARDED','HTTP_FORWARDED_FOR','HTTP_FORWARDED_FOR_IP','HTTP_PROXY_CONNECTION','HTTP_VIA','HTTP_X_FORWARDED','HTTP_X_FORWARDED_FOR');
	
	foreach ($headers as $header){
		if (isset($_SERVER[$header])) {
			$msg = 'Proxy access not allowed for header: '.$header;
			mail($email, 'Proxy Detect Header', $msg, 'From:mkgxy<admin@myflix.info>');
			$result = array('success' => 0, 'msg' => $msg);
		}
	}
}

function shapeSpace_block_proxy_visits_port() {
	$email = 'naveenkhanchandani@gmail.com';
	
	$ports = array(80,81,553,554,1080,3128,4480,6588,8000,8080);

	foreach ($ports as $port) {
		if (@fsockopen($_SERVER['REMOTE_ADDR'], $port, $errno, $errstr, 5)) {
			$msg = 'Proxy access not allowed based on P Record for port '.$port;
			mail($email, 'Proxy Detect', $msg, 'From:mkgxy<mkgxy@myflix.info>');
			$result = array('success' => 0, 'msg' => $msg);
		}
	}
}

shapeSpace_block_proxy_visits();
shapeSpace_block_proxy_visits_port();
$result = array('success' => 1);
echo json_encode($result);
?>