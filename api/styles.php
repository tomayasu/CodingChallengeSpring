<?php
header("Access-Control-Allow-Origin: *"); // Allows any origin to access the resource
header("Content-Type: application/json; charset=UTF-8"); // The MIME type of the response
header("Access-Control-Allow-Methods: GET"); // Specifies the method or methods allowed when accessing the resource
header("Access-Control-Max-Age: 3600"); // Indicates how long the results of a preflight request can be cached
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Indicates which HTTP headers can be used during the actual request

include 'database_config.php';
// Database connection
$db = new PDO('mysql:host='.$servername.';dbname='.$dbname.';charset=utf8', $username, $password);

// SQL query
$sql = "SELECT * FROM styles";

// Prepare and execute the query
$stmt = $db->prepare($sql);
$stmt->execute();

// Fetch the result as an associative array
$allergies = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Convert the array to a JSON string
$json = json_encode($allergies);

// Print the JSON string
echo $json;

// Now $allergies contains all records from the 'allergies' table