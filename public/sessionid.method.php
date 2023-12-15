'use client';
<?php
	function genSessionId() {
		$chars ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; $sessionid = '';
		for ($i = 0; $i < 15; $i++) {
			$index = rand(0, strlen($chars) - 1);
			$sessionid .= $chars[$index];
		} return $sessionid;
	}
?>
<!-- 
	Example usage:
	$password = genSessionId();
	echo $password; 
-->