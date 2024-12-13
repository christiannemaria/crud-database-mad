<?php

include('index.php');

if (isset($_POST['EmpFname'], $_POST['EmpLname'], $_POST['EmpPosition'], $_POST['EmpAge'], $_POST['EmpEmail'], $_POST['EmpPhone'])) {

    $EmpFname = $_POST['EmpFname'] ?? '';
    $EmpLname = $_POST['EmpLname'] ?? '';
    $EmpPosition = $_POST['EmpPosition'] ?? '';
    $EmpAge = $_POST['EmpAge'] ?? '';
    $EmpEmail = $_POST['EmpEmail'] ?? '';
    $EmpPhone = $_POST['EmpPhone'] ?? '';

    // Assuming $EmpFname is used to identify the employee for deletion
    $sql = "DELETE FROM employee WHERE EmpFname = ? AND EmpLname = ? AND EmpPosition = ? AND EmpAge = ? AND EmpEmail = ? AND EmpPhone= ?";

    if ($stmt = $conn->prepare($sql)) {

        $stmt->bind_param("ssssss", $EmpFname, $EmpLname, $EmpPosition, $EmpAge, $EmpEmail, $EmpPhone);

        if ($stmt->execute()) {
            header("Location: employee_list.php?message=Employee+Deleted");
            exit();
        } else {
            echo "Error executing query: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error preparing query: " . $conn->error;
    }
} else {
    echo "Invalid request. Missing required data.";
}

$conn->close();
?>
