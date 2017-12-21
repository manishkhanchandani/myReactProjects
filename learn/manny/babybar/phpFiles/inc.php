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

$myRealPath = dirname(__FILE__);
define('MY_REAL_PATH', $myRealPath);

//ini_set("include_path", '/home/consultlawyers/php:/home/consultlawyers/public_html/libraries:' . ini_get("include_path") );

//my autoloader
function myautoload($class_name) {
    $classPath = SITEDIR.'/api/'.implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);

$head = '';
include_once(MY_REAL_PATH.'/functions.php');

include_once(MY_REAL_PATH.'/layout.php');
?>