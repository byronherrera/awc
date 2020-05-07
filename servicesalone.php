<?php
/*
 * qWikiOffice Desktop 1.0
 * Copyright(c) 2007-2010, Murdock Technologies, Inc.
 * licensing@qwikioffice.com
 *
 * http://www.qwikioffice.com/license
 */

$service = isset($_POST['service']) ? $_POST['service'] : '';
if(isset($service) && $service != ''){
   if($service == 'login'){
      require_once('server/os.php');
      $os = new os();
      print $os->login($_POST['user'], $_POST['pass'], $_POST['group']);
   }
   if($service == 'logout'){
      require_once('server/os.php');
      $os = new os();
      $os->logout();
      print '{"success":true,"msg":"22001"}';
   }
}
?>