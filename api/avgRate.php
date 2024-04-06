<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$charset = 'utf8mb4';
include 'database_config.php';

try {
    $dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $username, $password, $opt);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$recipe_id = isset($data["recipe_id"]) ? $data["recipe_id"] : "";

if (!empty($recipe_id)) {
    try {
        // Prepare the SQL statement
        $stmt = $pdo->prepare("SELECT AVG(rate) as avg_rate FROM comments WHERE recipe_id = :recipe_id");

        // Bind the recipe ID to the SQL statement
        $stmt->bindParam(':recipe_id', $recipe_id);

        // Execute the SQL statement
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set response code - 200 OK
        http_response_code(200);

        // Return the result as a JSON response
        echo json_encode($result);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);

    echo json_encode(array("message" => "Unable to fetch average rating. Recipe ID is missing."));
}
?>