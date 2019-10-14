<?php
$recipient_email    = "ssbrusdom@gmail.com"; //recepient
$from_email         = "info@karelianhouse.ru"; //from email using site domain.
$subject            = "Новый отклик с промо-страницы best.karelianhouse.ru";


if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    die('Sorry Request must be Ajax POST'); //exit script
}

if($_POST){

    $sender_name    = filter_var($_POST["fieldname"], FILTER_SANITIZE_STRING); //capture sender name
    $sender_phone   = filter_var($_POST["fieldphone"], FILTER_SANITIZE_STRING); //capture sender email
    $message        = filter_var($_POST["fieldmessage"], FILTER_SANITIZE_STRING); //capture message
    $message .= "\n Имя: " . $sender_name;
    $message .= "\n Телефон: " . $sender_phone;

    //php validation
    // if(strlen($sender_name)<2){ // If length is less than 2 it will output JSON error.
    //     print json_encode(array('type'=>'error', 'text' => 'Имя не должно быть короче 2-х символов'));
    //     exit;
    // }
    // if(!filter_var($sender_phone, FILTER_VALIDATE_EMAIL)){ //email validation
    //     print json_encode(array('type'=>'error', 'text' => 'Пожалуйста, укажите корректный адрес электронной почты.'));
    //     exit;
    // }
    // if(strlen($message)<3){ //check emtpy message
    //     print json_encode(array('type'=>'error', 'text' => 'Сообщение не содержит какой-либо ценной информации и слишком лаконично. Попробуйте добавить содержания.'));
    //     exit;
    // }


    $boundary = md5("karelianhouse.ru");

    $headers = "From:".$from_email."\r\n".
     "Reply-To: ".$from_email. "\n" .
     "X-Mailer: PHP/" . phpversion();
     $body = $message;

    $sentMail = mail($recipient_email, $subject, $body, $headers);
    if($sentMail) //output success or failure messages
    {
        print json_encode(array('type'=>'done', 'text' => 'Сообщение отправлено, благодарим!'));
        exit;
    }else{
        print json_encode(array('type'=>'error', 'text' => 'Ошибка отправки сообщения, проверьте конфигурацию PHP.'));
        exit;
    }
}
?>
