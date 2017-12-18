<?php
session_name('my_session');
session_start();

define('ROOTDIR', dirname(__FILE__));
define('SITEDIR', ROOTDIR);

define('ENV', 'production');

$dir = dirname($_SERVER['PHP_SELF']);
if ($dir == '/') $dir = '';

$dir = $dir .'/';

$host = str_replace('www.', '', $_SERVER['HTTP_HOST']);
define('SITENAME', ucwords($host));
define('ROOTDOMAIN', $host);
define('HTTPPATH', 'http://'.$host.$dir);
define('ROOTHTTPPATH', $dir);
define('APIDIR', $dir.'/api');
define('APIHTTPPATH', 'http://'.$host.APIDIR);
define('ADMIN_EMAIL', 'mkgxy@calbabybar.com');
define('PLACESAPIKEY', 'AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw');
define('DEFAULT_LATITUDE', 37.3867);
define('DEFAULT_LONGITUDE', -121.897);
define('ENCRYPTKEY', 'JKjVXtFdY3NNT6Fp6U9uM3m5eeWbtqXWrR5qwWpyM9b8SFSdWVK2vruN');

//ini_set("include_path", '/home/consultlawyers/php:/home/consultlawyers/public_html/libraries:' . ini_get("include_path") );

//my autoloader
function myautoload($class_name) {
    $classPath = SITEDIR.'/api/help/MkGalaxy/'.implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);

include_once('functions.php');


$defaultPage = 'home';
$page = $defaultPage;
$p = $defaultPage;
if (!empty($_GET['p'])) {
  $page = $_GET['p'];
  $p = $_GET['p'];
}
$page .= '.php';
$pageTitle = 'Some Page Title';

ob_start();
if (file_exists($page)) {
  include($page);
} else {
  include($defaultPage.'.php');
}

$contentForTemplate = ob_get_clean();

include('template.php');
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>display</title>
<style type="text/css">

</style>
</head>

<body>
</body>
</html>
