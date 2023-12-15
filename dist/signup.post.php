<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

// Получение данных из тела запроса
$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$email = isset($data->email) ? $data->email : '';
$name = isset($data->name) ? $data->name : '';
$surname = isset($data->surname) ? $data->surname : '';
$password = isset($data->password) ? $data->password : '';

if (empty($name) || empty($surname) || empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$name = $conn->real_escape_string($name);
$surname = $conn->real_escape_string($surname);
$email = $conn->real_escape_string($email);

$check_user_sql = "SELECT id FROM users WHERE email = '$email'";
$check_user_result = $conn->query($check_user_sql);

if ($check_user_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} elseif ($check_user_result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'User with this email already exists']);
    exit;
}

$token = md5(uniqid());

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$insert_user_sql = "INSERT INTO users (name, surname, email, password, token) VALUES ('$name', '$surname', '$email', '$hashed_password', '$token')";
if ($conn->query($insert_user_sql) === true) {
    echo json_encode(['status' => 'success', 'token' => $token, 'message' => 'User registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Registration failed']);
}

$conn->close();
?>
