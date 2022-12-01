<?php

if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}

$to = "morse.christopher@gmail.com";

$name = $_POST['name'];
$email = $_POST['email'];
$company = $_POST['company'];
$telephone = $_POST['telephone'];
$comment = $_POST['comments'];

$email_subject = "[vspline]".$name;
$email_body = "Name: ".$name."\r\n".
    "Email: ".$email."\r\n".
    "Company: ".$company."\r\n".
    "Phone: ".$telephone."\r\n".
    "Comment: ".$comment;

$email_from = "visitor@vspline.com";
$headers = 'From: '.$email_from."\r\n".'Reply-To: '.$email_from."\r\n" .'X-Mailer: PHP/' . phpversion();

mail($to, $email_subject, $email_body, $headers);
header('Location: /thanks.html');
    
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>