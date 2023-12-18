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

$user_info = "SELECT * FROM users WHERE token='$token'";
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
    $row_chat = $check_chat_result->fetch_assoc();
    $user1 = $row_chat['user1'];
    $user2 = $row_chat['user2'];
    $second_user = $user1==$user_id_token?$user2:$user1;
    $sql = "SELECT * FROM messages WHERE chat_id='$chat_id' and (sender='$user1' or sender='$user2') and (recipient='$user1' or recipient='$user2')";
    $result = $conn->query($sql);
    $suser = "SELECT * FROM users WHERE id='$second_user'";
        $suser_res = $conn->query($suser);
        if($suser_res->num_rows > 0){
            $row_suser = $suser_res->fetch_assoc();
            $user2_info = ['id'=>$second_user, 'name'=>$row_suser['name'], 'surname'=>$row_suser['surname'], 'email'=>$row_suser['email']];
        }
    if ($result->num_rows > 0) {
        $messages = [];
        while ($row = $result->fetch_assoc()) {
            $message = ['message_id' => $row['message_id'], 'sender' => $row['sender'], 'date' => $row['date'], 'message' => $row['message'], 'read_status' => $row['read_status']];
            $messages[] = $message;
        }
        echo json_encode(['status' => 'success', 'message' => 'Messages received successfully', 'messages' => $messages, 'id_to_user'=>$user_id_token, 'second_user'=>$user2_info], JSON_PRETTY_PRINT || JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Messages not found', 'messages'=>[], 'id_to_user'=>$user_id_token, 'second_user'=>$user2_info]);
    }
}

$conn->close();
?>