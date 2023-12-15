<?php
	$servername = 'srv-pleskdb39.ps.kz:3306';
	$username = 'clickmek_user';
	$password = 'Aktau7292';
	$database = 'clickmek_ozimiz';

	$conn = new mysqli(
		$servername,
		$username,
		$password,
		$database
	); 
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	}
	?>