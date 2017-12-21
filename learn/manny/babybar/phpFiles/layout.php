<?php

$defaultPage = 'home';
$page = $defaultPage;
$p = $defaultPage;
if (!empty($_GET['p'])) {
  $page = $_GET['p'];
  $p = $_GET['p'];
}
$page .= '.php';
$pageTitle = 'Some Page Title';

$pageDir = MY_REAL_PATH.'/pages/';

ob_start();
?>
<div>
<?php include_once(MY_REAL_PATH.'/nav.php');

if (file_exists($pageDir.$page)) {
  include($pageDir.$page);
} else {
  include($pageDir.$defaultPage.'.php');
}
?>
</div>
<?php
$contentForTemplate = ob_get_clean();
?>