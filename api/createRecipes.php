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

$dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $username, $password, $opt);

$data = json_decode(file_get_contents('php://input'), true);

$title = isset($data["title"]) ? $data["title"] : "";
$time = isset($data["time"]) ? $data["time"] : "";
$cost = isset($data["cost"]) ? $data["cost"] : "";
$numServe = isset($data["numServe"]) ? $data["numServe"] : "";
$Ingredients = isset($data["Ingredients"]) ? $data["Ingredients"] : "";
$steps = isset($data["steps"]) ? $data["steps"] : array();
$allergies = isset($data["allergies"]) ? $data["allergies"] : array();

if (!empty($title) && !empty($time) && !empty($cost) && !empty($numServe) && !empty($Ingredients) && !empty($steps)) {
    // Insert recipe
    $stmt = $pdo->prepare("INSERT INTO recipes (title, time, cost, numServe, Ingredients) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$title, $time, $cost, $numServe, $Ingredients])) {
        $recipeID = $pdo->lastInsertId();

        // Insert steps
        foreach ($steps as $step) {
            $stmt = $pdo->prepare("INSERT INTO steps (fk_recipe_id, stepNum, description, image) VALUES (?, ?, ?, ?)");
            $stmt->execute([$recipeID, $step["stepNum"], $step["description"], $step["image"]]);
        }

        // Insert allergies
        foreach ($allergies as $allergyID) {
            $stmt = $pdo->prepare("INSERT INTO post_allergies (post_id, allergy_id) VALUES (?, ?)");
            $stmt->execute([$recipeID, $allergyID]);
        }

        // Set response code - 201 created
        http_response_code(201);

        echo json_encode(array("message" => "Recipe was created."));
    } else {
        // Set response code - 503 service unavailable
        http_response_code(503);

        echo json_encode(array("message" => "Unable to create recipe."));
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create recipe. Data is incomplete."));
}
?>