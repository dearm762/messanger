<?php
	$servername = 'srv-pleskdb39.ps.kz:3306';
	$username = 'clickmek_ozimiz';
	$password = 'clickmek_user';
	$database = 'Aktau7292';

	$sqlServer = new mysqli(
		$servername,
		$username,
		$password,
		$database
	); if ($sqlServer->connect_error) {
			die("Connection failed: " . $sqlServer->connect_error);
	} echo "Connected successfully";
	$sqlServer->close();
?>