<?php
include('index.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
        exit;
    }

    $sql = "SELECT id, password FROM users WHERE email = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                echo json_encode(["success" => true, "message" => "Login successful."]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid email or password."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Database query failed."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
