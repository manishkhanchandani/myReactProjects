<?php //require_once('../../Connections/conn.php'); ?>
<?php
if (!isset($_SESSION)) {
  session_start();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');


try {

	include('../functions.php');
	$return = array();

	$return['success'] = 1;
	if (empty($_GET['refreshToken'])) {
		throw new Exception('missing refresh token');
	}
	$url = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyBhpHK-ve2s0ynnr8og8Zx0S69ttEFpDKk';
	
	$params = array('grant_type' => 'refresh_token', 'refresh_token' => $_GET['refreshToken']);
	$postParams = json_encode($params);
	
	$result = curlpostjson($url, $postParams);
	$output = json_decode($result['output'], true);
	pr($output);
	exit;
	if (empty($output['user_id'])) {
		throw new Exception('no valid user');
	}
	
	if ($uid != $output['user_id']) {
		throw new Exception('invalid user');
	}
	

} catch(Exception $e) {
	$return['success'] = 0;
	$return['error'] = $e->getMessage();
}
echo json_encode($return);

?>
