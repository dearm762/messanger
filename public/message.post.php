<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$token = isset($data->token) ? $data->token : '';
$chat_id = isset($data->chat_id) ? $data->chat_id : '';
$date = date('Y-m-d H:i:s');
$message = isset($data->message) ? $data->message : '';

if (empty($token) || empty($chat_id) || empty($date) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$token = $conn->real_escape_string($token);
$chat_id = $conn->real_escape_string($chat_id);
$message = $conn->real_escape_string($message);

$user_id_inf = "SELECT id FROM users WHERE token='$token'";
$user_id_inf_res = $conn->query($user_id_inf);
if($user_id_inf_res->num_rows > 0){
    $row = $user_id_inf_res->fetch_assoc();
    $usr_id = $row['id'];
}

$check_chat_sql = "SELECT * FROM chats WHERE chat_id = '$chat_id'";
$check_chat_result = $conn->query($check_chat_sql);

if ($check_chat_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} elseif ($check_chat_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Chat not found']);
    exit;
} else {
    $insert_message_sql = "INSERT INTO messages (sender, chat_id, date, message) VALUES ('$usr_id', '$chat_id', '$date', '$message')";

    if ($conn->query($insert_message_sql) === true) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Message sending failed']);
    }
}

$conn->close();
?>