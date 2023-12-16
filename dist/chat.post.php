<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$user1 = isset($data->user1) ? $data->user1 : '';
$user2 = isset($data->user2) ? $data->user2 : '';

if (empty($user1) || empty($user2)) {
    echo json_encode(['status' => 'error', 'message' => 'user1_id and user2_id are required']);
    exit;
}

$user1 = $conn->real_escape_string($user1);
$user2 = $conn->real_escape_string($user2);

$check_user1_sql = "SELECT id FROM users WHERE id = '$user1'";
$check_user2_sql = "SELECT id FROM users WHERE id = '$user2'";
$check_user1_result = $conn->query($check_user1_sql);
$check_user2_result = $conn->query($check_user2_sql);

if ($check_user1_result === false || $check_user2_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} else if ($check_user1_result->num_rows === 0 || $check_user2_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
} else if ($check_user1_result->num_rows > 0 && $check_user2_result->num_rows > 0) {
    $sql = "SELECT * FROM chats WHERE user1 = '$user1' or user2='$user1' and user1 = '$user2' or user2='$user2'";
    $check_chat = $conn->query($sql);
    if ($check_chat->num_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Сhat exists']);
    } else {
        $create_chat_sql = "INSERT INTO chats (user1, user2) VALUES ('$user1', '$user2')";
        if ($conn->query($create_chat_sql) === true) {
            echo json_encode(['status' => 'success', 'message' => 'Chat created successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Chat creation failed']);
        }
    }
}
$conn->close();
?>