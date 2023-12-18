<?php
header('Access-Control-Allow-Origin: https://react.clickme.kz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
require_once "connecting.method.php";

$request_body = file_get_contents("php://input");
$data = json_decode($request_body);

if (empty($data->photo) || empty($data->token)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$token = $conn->real_escape_string($data->token);
$photo = $conn->real_escape_string($data->photo);

$check_user_sql = "SELECT * FROM users WHERE token='$token'";
$check_user_result = $conn->query($check_user_sql);

if ($check_user_result === false) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
} elseif ($check_user_result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
} else {
    if ($_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = './uploads/';
        $uploadFile = $uploadDir . '/' . basename($_FILES['photo']['name']);

        if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadFile)) {
            $sql = "UPDATE users SET photo='$uploadFile' WHERE token='$token'";
            $res = $conn->query($sql);

            if ($res    ) {
                echo json_encode(['status' => 'success', 'message' => 'Photo successfully updated']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update photo in the database']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File upload error']);
    }
}

$conn->close();
?>
