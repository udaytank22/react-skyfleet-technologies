<?php
/**
 * NexaCore IT Solutions — mail.php
 * PHP alternative backend for contact form email
 *
 * ── SETUP INSTRUCTIONS ──
 *
 * 1. Upload this file to your PHP hosting (Apache/Nginx).
 *    Make sure PHP mail() or PHPMailer is available.
 *
 * 2. For better deliverability, install PHPMailer via Composer:
 *      composer require phpmailer/phpmailer
 *    Then un-comment the PHPMailer block below and comment out the mail() block.
 *
 * 3. Edit $to_email to your inbox address.
 *
 * 4. In script.js, change the fetch URL to:
 *      'mail.php'
 *    (if both files are in the same folder)
 *
 * 5. CORS: this script allows all origins (*). Restrict to your domain in production.
 */

// ── CORS headers ──
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit();
}

// ── Parse incoming JSON ──
$data    = json_decode(file_get_contents('php://input'), true);
$name    = htmlspecialchars(trim($data['name']    ?? ''));
$email   = htmlspecialchars(trim($data['email']   ?? ''));
$phone   = htmlspecialchars(trim($data['phone']   ?? '—'));
$service = htmlspecialchars(trim($data['service'] ?? ''));
$message = htmlspecialchars(trim($data['message'] ?? ''));

// ── Basic validation ──
if (!$name || !$email || !$service || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields.']);
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit();
}

// ── Edit this to your inbox ──
$to_email = 'tankuday9059@gmail.com';

// ── Email to company ──
$subject = "New Service Enquiry — $service";
$body    = "Name:    $name\nEmail:   $email\nPhone:   $phone\nService: $service\n\nMessage:\n$message";
$headers = "From: tankuday9059@gmail.com\r\nReply-To: tankuday9059@gmail.com\r\nContent-Type: text/plain; charset=UTF-8";

$sent = mail($to_email, $subject, $body, $headers);

if ($sent) {
    // ── Auto-reply to client ──
    $reply_subject = "We've received your enquiry — SkyFleet";
    $reply_body    = "Hi $name,\n\nThank you for reaching out! We've received your enquiry about \"$service\" and will get back to you within 1 business day.\n\nYour message:\n$message\n\n---\nSkyFleet Technologies\ntankuday9059@gmail.com";
    $reply_headers = "From: tankuday9059@gmail.com\r\nContent-Type: text/plain; charset=UTF-8";
    mail($email, $reply_subject, $reply_body, $reply_headers);

    http_response_code(200);
    echo json_encode(['message' => 'Email sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Check server configuration.']);
}

/*
 * ── PHPMailer alternative (SMTP, recommended) ──
 * Un-comment this block and comment out the mail() calls above.
 * Run: composer require phpmailer/phpmailer

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your@gmail.com';       // SMTP user
    $mail->Password   = 'your_app_password';    // Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('your@gmail.com', 'NexaCore Contact Form');
    $mail->addAddress('hello@nexacore.in');
    $mail->addReplyTo($email, $name);
    $mail->Subject = "New Enquiry — $service";
    $mail->Body    = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\nMessage:\n$message";

    $mail->send();
    http_response_code(200);
    echo json_encode(['message' => 'Email sent.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $mail->ErrorInfo]);
}
*/
?>
