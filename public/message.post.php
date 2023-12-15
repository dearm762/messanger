<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$sender = isset($data->sender) ? $data->sender : '';
$recipient = isset($data->recipient) ? $data->recipient : '';
$chat_id = isset($data->chat_id) ? $data->chat_id : '';
$date = date('Y-m-d H:i:s');
$message = isset($data->message) ? $data->message : '';

if (empty($sender) || empty($recipient) || empty($chat_id) || empty($date) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$sender = $conn->real_escape_string($sender);
$recipient = $conn->real_escape_string($recipient);
$chat_id = $conn->real_escape_string($chat_id);
$date = $conn->real_escape_string($date);
$message = $conn->real_escape_string($message);

$check_chat_sql = "SELECT chat_id FROM chats WHERE chat_id = '$chat_id'";
$check_chat_result = $conn->query($check_chat_sql);

if ($check_chat_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} elseif ($check_chat_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Chat not found']);
    exit;
} else {
    $insert_message_sql = "INSERT INTO messages (sender, recipient, chat_id, date, message, read_status) VALUES ('$sender', '$recipient', '$chat_id', '$date', '$message', 'unread')";

    if ($conn->query($insert_message_sql) === true) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Message sending failed']);
    }
}

$conn->close();
?>