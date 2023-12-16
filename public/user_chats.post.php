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

$_GETtoken = $conn->real_escape_string($token);

$check_user = "SELECT * FROM users WHERE token='$token'";
$check_user_result = $conn->query($check_user);

if ($check_user_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} else if ($check_user_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
} else if ($check_user_result->num_rows > 0) {
    $row = $check_user_result->fetch_assoc();
    $user_id = $row['id'];
    $sql = "SELECT * FROM chats WHERE user1 = '$user_id' or user2='$user_id'";
    $check_chat = $conn->query($sql);
    if ($check_chat->num_rows > 0) {
        $chats = [];
        while ($row = $check_chat->fetch_assoc()) {
            $second_user = $row['user1'] == $user_id ? $row['user2'] : $row['user1'];
            $check_second_user = "SELECT * FROM users WHERE id='$second_user'";
            $check_second_user_result = $conn->query($check_second_user);
            if ($check_second_user_result->num_rows > 0) {
                $second_user_info = $check_second_user_result->fetch_assoc();
                $name = $second_user_info['name'];
                $surname = $second_user_info['surname'];
                $email = $second_user_info['email'];
                $chat_id = $row['chat_id'];
                $sql_last_mess = "SELECT * FROM messages WHERE chat_id='$chat_id' ORDER BY date DESC LIMIT 1";
                $latest_chat_mess = $conn->query($sql_last_mess);
                if($latest_chat_mess->num_rows > 0){
                    $row = $latest_chat_mess->fetch_assoc();
                    $last_mess = $row['message'];
                    list($date_last_mess, $time_last_mess) = explode(" ", $row['date']);
                }
                $chat = ['chat_id' => $chat_id, 'chat_to_user' => $second_user, 'name' => $name, 'surname' => $surname, 'email' => $email, 'last_message'=>$last_mess, 'last_message_date'=>$date_last_mess, 'last_message_time'=>$time_last_mess];
                $chats[] = $chat;
            }
        }
        echo json_encode(['status' => 'success', 'message' => 'Сhats found', 'chats' => $chats], JSON_PRETTY_PRINT || JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Chats not found']);
    }
}
$conn->close();
?>