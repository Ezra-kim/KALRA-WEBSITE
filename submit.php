<?php
$host = "localhost";
$dbname = "contact form";  
$username = "root";
$password = "";                  // XAMPP default is empty

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the data from your form
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $topic   = $_POST['topic'];
    $message = $_POST['message'];

    // Insert into database
    $sql = "INSERT INTO submissions (name, email, topic, message) 
            VALUES (?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $topic, $message]);

    // Success message
    echo "Thank you! Your message has been sent successfully.";

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>