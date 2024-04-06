<?php
include 'database_config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get POST parameters
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['recipe_id']) && isset($data['comment']) && isset($data['rate'])) {
  $recipe_id = $data['recipe_id'];
  $comment = $data['comment'];
  $rate = $data['rate'];

  // Prepare and bind
  $stmt = $conn->prepare("INSERT INTO comments (recipe_id, comment, rate) VALUES (?, ?, ?)");
  $stmt->bind_param("isd", $recipe_id, $comment, $rate);

  // Execute the statement
  $stmt->execute();

  echo "New comment created successfully";
} else {
  echo "Error: Not all required data was provided.";
}

$stmt->close();
$conn->close();
?>