<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$chat_id = isset($data->chat_id) ? $data->chat_id : '';

if (empty($chat_id)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$chat_id = $conn->real_escape_string($chat_id);

$check_chat_sql = "SELECT * FROM chats WHERE chat_id = '$chat_id'";
$check_chat_result = $conn->query($check_chat_sql);

if ($check_chat_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} elseif ($check_chat_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Chat not found']);
    exit;
} else if ($check_chat_result->num_rows > 0) {
    $sql = "SELECT * FROM messages WHERE chat_id='$chat_id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $messages = [];
        while ($row = $result->fetch_assoc()) {
            $message = ['message_id' => $row['message_id'], 'sender' => $row['sender'], 'date' => $row['date'], 'message' => $row['message'], 'read_status' => $row['read_status']];
            $messages[] = $message;
        }
        echo json_encode(['status' => 'success', 'message' => 'Messages received successfully', 'messages' => $messages], JSON_PRETTY_PRINT || JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Messages not found']);
    }
}

$conn->close();
?>