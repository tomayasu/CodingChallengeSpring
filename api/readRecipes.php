<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'database_config.php';
$charset = 'utf8mb4';

$dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $username, $password, $opt);

$query = "
    SELECT 
        recipes.title, recipes.recipeID, recipes.time, recipes.cost, recipes.numServe, recipes.Ingredients,
        steps.stepNum, steps.description, steps.image, recipes.image,
        allergies.allergyID, allergies.food,
        (SELECT AVG(comments.rate) FROM comments WHERE comments.recipe_id = recipes.recipeID) as avg_rate
    FROM recipes
    LEFT JOIN steps ON recipes.recipeID = steps.fk_recipe_id
    LEFT JOIN post_allergies ON recipes.recipeID = post_allergies.post_id
    LEFT JOIN allergies ON post_allergies.allergy_id = allergies.allergyID
    ORDER BY recipes.recipeID, steps.stepNum
";

$stmt = $pdo->prepare($query);
$stmt->execute();

$data = $stmt->fetchAll();

echo json_encode($data);
?>