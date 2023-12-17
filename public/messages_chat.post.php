<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

$chat_id = isset($data->chat_id) ? $data->chat_id : '';
$token = isset($data->token) ? $data->token : '';

if (empty($chat_id ) || empty($token)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$chat_id = $conn->real_escape_string($chat_id);
$token = $conn->real_escape_string($token);

$user_info = "SELECT * FROM users WHERE token='$user_info'";
$user_info_res = $conn->query($user_info);
if($user_info_res->num_rows > 0){
    $row_user = $user_info_res->fetch_assoc();
    $user_id_token = $row_user['id'];
}

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
        echo json_encode(['status' => 'success', 'message' => 'Messages received successfully', 'messages' => $messages, 'id_to_user'=>$user_id_token], JSON_PRETTY_PRINT || JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Messages not found']);
    }
}

$conn->close();
?>