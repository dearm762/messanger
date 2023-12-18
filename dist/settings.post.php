<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$name = isset($data->name) ? $data->name : '';
$surname = isset($data->surname) ? $data->surname : '';
$username = isset($data->username) ? $data->username : '';
$email = isset($data->email) ? $data->email : '';

if (empty($name) || empty($surname) || empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'parametrs are required']);
    exit;
}else if(empty($username)){
    $username = null;
}

$token = $conn->real_escape_string($token);
$name = $conn->real_escape_string($name);
$surname = $conn->real_escape_string($surname);
$username = $conn->real_escape_string($username);
$email = $conn->real_escape_string($email);

$check_user_sql = "SELECT * FROM users WHERE token = '$token'";
$check_user_result = $conn->query($check_user_sql);

if ($check_user_result === false ) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} else if ($check_user_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
} else if ($check_user_result->num_rows > 0) {
    $sql = "UPDATE users SET name='$name', surname='$surname', username='$username', email='$email' WHERE token = '$token'";
    $res = $conn->query($sql);
    if($res){
        echo json_encode(['status' => 'success', 'message' => 'User successfly updated']);
    }
}
$conn->close();
?>