<?php
include 'database_config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // The request is a preflight request. Respond to it and end the script.
  header("Access-Control-Allow-Methods: GET, POST");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Max-Age: 86400");
  die;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get recipe_id from the request
if (isset($_GET['recipe_id'])) {
  $recipe_id = $_GET['recipe_id'];

  // Prepare and execute the SQL statement
  $stmt = $conn->prepare("SELECT * FROM comments WHERE recipe_id = ?");
  $stmt->bind_param("i", $recipe_id);
  $stmt->execute();

  // Get the result
  $result = $stmt->get_result();

  // Fetch the data
  $comments = array();
  while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
  }

  // Return the data as JSON
  echo json_encode($comments);
} else {
  echo "Error: No recipe_id provided.";
}

if (isset($stmt)) {
  $stmt->close();
}

$conn->close();
?>