<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/api/Slim/Slim.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/api/PHPMailer/PHPMailerAutoload.php');
\Slim\Slim::registerAutoloader();

// create new Slim instance
$app = new \Slim\Slim();
$app -> config(array('MODE' => 'production', 'cookies.secure' => true, 'cookies.encrypt' => true, 'cookies.secret_key' => 'secret_key', 'cookies.lifetime' => '20 minutes', 'cookies.path' => '/cookies', 'debug' => true));

$app -> group("/api", function() use ($app) {

	$app -> post("/send-mail", function() use ($app) {
		$data = json_decode($app -> request -> getBody(), true);

		if (isset($_POST['inputName']) && isset($_POST['inputFromEmail']) && isset($_POST['inputSubject']) && isset($_POST['inputMessage'])) {
			//check if any of the inputs are empty
			if (empty($_POST['inputName']) || empty($_POST['inputFromEmail']) || empty($_POST['inputSubject']) || empty($_POST['inputMessage'])) {
				$data = array('success' => false, 'message' => 'Please fill out the form completely.');
				echo json_encode($data);
				exit ;
			}
			//create an instance of PHPMailer
			$mail = new PHPMailer();

			$mail -> IsSMTP();
			//$mail -> SMTPDebug = 1;
			$mail -> Host = "just137.justhost.com";
			$mail -> SMTPAuth = true;
			$mail -> Username = "contact@lucygregcleaning.co.uk";
			$mail -> Password = ".kbHPKvCWiA7";
			$mail -> SMTPSecure = 'ssl';
			$mail -> Port = 465;

			if (isset($_POST['inputToEmail'])) {
				if (empty($_POST['inputToEmail'])) {
					$data = array('success' => false, 'message' => 'Please fill out the form completely.');
					echo json_encode($data);
					exit ;
				}
				$mail -> AddAddress($_POST['inputToEmail']);//recipient
			} else {

				$mail -> AddAddress('contact@lucygregcleaning.co.uk');//recipient
			}
			
			$mail -> From = $_POST['inputFromEmail'];
			$mail -> FromName = $_POST['inputName'];
			$mail -> Subject = $_POST['inputSubject'];
			$mail -> Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

			if (isset($_POST['ref'])) {
				$mail -> Body .= "\r\n\r\nRef: " . $_POST['ref'];
			}

			if (!$mail -> send()) {
				$data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail -> ErrorInfo);
				echo json_encode($data);
				exit ;
			} else {
				$data = array('success' => true, 'message' => 'Thanks! We have received your message.');
				echo json_encode($data);
			}

		} else {

			$data = array('success' => false, 'message' => 'Please fill out the form completely.');
			echo json_encode($data);

		}

	});

});

$app -> get("/test/:id", function($id) {
	echo "<h1>Hello Slim World " . $id . "</h1>";

});

// this comes at the bottom of the file after all the web services were defined
$app -> run();
?>