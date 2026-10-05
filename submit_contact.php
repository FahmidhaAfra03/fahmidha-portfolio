<?php
header('Content-Type: application/json');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Extract and sanitize inputs
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$project = isset($_POST['project']) ? trim(strip_tags($_POST['project'])) : '';
$details = isset($_POST['details']) ? trim(strip_tags($_POST['details'])) : '';
$budget = isset($_POST['budget']) ? trim(strip_tags($_POST['budget'])) : '';

// Validation
if (empty($name)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Name field is required.'
    ]);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

if (empty($project)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Project/Business Name field is required.'
    ]);
    exit;
}

if (empty($details)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Project details field is required.'
    ]);
    exit;
}

// Log message to local JSON file (simulating db/saving inquiries)
$log_file = 'messages.json';

$new_message = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'],
    'name' => $name,
    'email' => $email,
    'project' => $project,
    'details' => $details,
    'budget' => $budget
];

$messages = [];
if (file_exists($log_file)) {
    $existing_data = file_get_contents($log_file);
    if (!empty($existing_data)) {
        $decoded = json_decode($existing_data, true);
        if (is_array($decoded)) {
            $messages = $decoded;
        }
    }
}

// Prepend the new message
array_unshift($messages, $new_message);

// Save back to JSON file
if (file_put_contents($log_file, json_encode($messages, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your message has been received successfully.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: Unable to save message at this time.'
    ]);
}
exit;
?>
