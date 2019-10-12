<?php
if($_POST) {
    $to_email = "bomber@sampo.ru"; //Recipient email, Replace with own email here
    $from_email = "info@karelianhouse.ru"; //From email, most emails won't work without it.
  
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    // $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    // $country_code   = filter_var($_POST["country_code"], FILTER_SANITIZE_NUMBER_INT);
    $phone_number   = filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);
    // $subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_name)<2){ // If length is less than 2 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'В имени слишком мало символов'));
        die($output);
    }
    // if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
    //     $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
    //     die($output);
    // }
    // if(!filter_var($country_code, FILTER_VALIDATE_INT)){ //check for valid numbers in country code field
    //     $output = json_encode(array('type'=>'error', 'text' => 'В коде страны ошибка'));
    //     die($output);
    // }
    if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        $output = json_encode(array('type'=>'error', 'text' => 'Только цифры в номере телефона!'));
        die($output);
    }
    // if(strlen($subject)<3){ //check emtpy subject
    //     $output = json_encode(array('type'=>'error', 'text' => 'Subject is required'));
    //     die($output);
    // }
    // if(strlen($message)<3){ //check emtpy message
    //     $output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
    //     die($output);
    // }
    
    //email body
    $message_body = $message."\r\n\r\n-".$user_name."\r\nТелефон : ".$phone_number;
    
    //proceed with PHP email.
    $headers = 'From: '.$from_email.'' . "\r\n" .
    'Reply-To: '.$from_email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = mail($to_email, $subject, $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Уважаемый(ая) '.$user_name .', Ваш запрос был отправлен!'));
        die($output);
    }
}
?>