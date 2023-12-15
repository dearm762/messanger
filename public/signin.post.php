<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

require_once "connecting.method.php";

// Получение данных из тела запроса
$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

// Проверка наличия email и password
$email = isset($data->email) ? $data->email : '';
$password = isset($data->password) ? $data->password : '';

if (empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    exit;
}

$email = $conn->real_escape_string($email);

$sql = "SELECT id, password, token FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
} elseif ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $stored_hash = $row['password'];

    if (password_verify($password, $stored_hash)) {
        $token = $row['token'];
        echo json_encode(['status' => 'success', 'token' => $token]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

$conn->close();
?>
