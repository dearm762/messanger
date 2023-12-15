<?php
	header('Access-Control-Allow-Origin: https://react.clickme.kz');
	header('Access-Control-Allow-Methods: POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Credentials: true');

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			exit;
	}

	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			$postData = json_decode(file_get_contents('php://input'), true);
			if (isset($postData['name']) && isset($postData['surname']) && isset($postData['email']) && isset($postData['password'])) {
					$validCredentials = validateCredentials($postData['name'], $postData['surname'], $postData['email'], $postData['password']);

					if ($validCredentials) {
							$response = array(
								'status' => 'success',
								'message' => 'Welcome to Ozimiz',
								'token' => $validCredentials
							);
							echo json_encode($response);
					} else {
							echo json_encode(array(
								'status' => 'error',
								'message' => 'The data you’ve entered is incorrect'
							));
					}
			} else {
					http_response_code(400);
					echo json_encode(array('error' => 'Missing required fields'));
			}

	} else {
			http_response_code(405);
			echo json_encode(array('error' => 'Method Not Allowed'));
	}

	function validateCredentials($name, $surname, $email, $password) {
		// check datas, do something with data and return token or false
		return 'testtoken'; // this is test token
	}
?>