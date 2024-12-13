<?php 

header("Access-Control-Allow-Origin: http://localhost:8081"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Database connection
        $conn = mysqli_connect("localhost", "root", "nemaria2111", "employeedata", "3307");

        if (!$conn) {
            throw new Exception("Connection Failed: " . mysqli_connect_error());
        }

        // Retrieving POST data
        $EmpName = $_POST['EmpName'] ?? '';
        $EmpPosition = $_POST['EmpPosition'] ?? '';
        $EmpAge = $_POST['EmpAge'] ?? '';
        $EmpEmail = $_POST['EmpEmail'] ?? '';
        $EmpPhone = $_POST['EmpPhone'] ?? '';

        // Validating input
        if (empty($EmpName) || empty($EmpPosition) || empty($EmpAge) || empty($EmpEmail) || empty($EmpPhone)) {
            throw new Exception("All fields are required.");
        }

        // Preparing the SQL query
        $add = "INSERT INTO employee (EmpName, EmpPosition, EmpAge, EmpEmail, EmpPhone) 
                VALUES ('$EmpName', '$EmpPosition', $EmpAge, '$EmpEmail', '$EmpPhone')";

        // Executing the query
        if (mysqli_query($conn, $add)) {
            echo "Record inserted successfully";
        } else {
            echo "Error inserting record: " . mysqli_error($conn);
        }

    } catch (Exception $e) {
        echo "Something went wrong: " . $e->getMessage();
    } finally {
        // Closing the connection
        mysqli_close($conn);
    }
} else {
    // Handle invalid request method
    echo "Invalid request method! Use POST to submit data.";
}

?>
