<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$token = isset($data->token) ? $data->token : '';

if (empty($token)) {
    echo json_encode(['status' => 'error', 'message' => 'token are required']);
    exit;
}

$token = $conn->real_escape_string($token);

$check_user_sql = "SELECT * FROM users WHERE token = '$token'";
$check_user_result = $conn->query($check_user_sql);

if ($check_user_result === false ) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} else if ($check_user_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
} else if ($check_user_result->num_rows > 0) {
    $row = $check_user_result->fetch_assoc();
    echo json_encode(['status' => 'success','id'=>$row['id'],'name'=>$row['name'], 'surname'=>$row['surname'], 'username'=>$row['username'], 'email'=>$row['email'], 'photo'=>$row['photo']], JSON_PRETTY_PRINT || JSON_UNESCAPED_UNICODE);
}
$conn->close();
?>