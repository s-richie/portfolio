<?php
// Database connection settings
$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'root'; 
$password = ''; 

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Sanitize input data
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $subject = filter_var($_POST['_subject'], FILTER_SANITIZE_STRING);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

        // Validate inputs
        if (empty($name) || empty($email) || empty($message)) {
            throw new Exception("Required fields are missing");
        }

        // Prepare and execute SQL statement
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $subject, $message]);

        // Redirect to thank you page
        header("Location: /thanks.html");
        exit();
    }
} catch (PDOException $e) {
    // Log error (in production, use proper logging)
    error_log("Database error: " . $e->getMessage());
    $error = "An error occurred while saving your message. Please try again later.";
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>

<?php if (isset($error)): ?>
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h2>Error</h2>
    <p><?php echo htmlspecialchars($error); ?></p>
    <a href="index.php">Go Back</a>
</body>
</html>
<?php endif; ?>