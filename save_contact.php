<?php
session_start();

// Verify CSRF token
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['csrf_token']) && $_POST['csrf_token'] === $_SESSION['csrf_token']) {
    // Sanitize and validate input
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST['_subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: index.php?error=invalid_email#contact');
        exit;
    }

    // Process the form (e.g., save to file for demonstration)
    $data = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message\n---\n";
    file_put_contents('contacts.txt', $data, FILE_APPEND);

    // Regenerate CSRF token for security
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    // Redirect back with success parameter
    header('Location: index.php?success=true#contact');
    exit;
} else {
    // Invalid CSRF token or request method
    header('Location: index.php?error=invalid#contact');
    exit;
}
?>