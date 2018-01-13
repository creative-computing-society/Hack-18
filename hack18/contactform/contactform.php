<?php
  $name=$_POST['name'];
  $email=$_POST['email'];
  $sub=$_POST['subject'];
  $mesg=$_POST['message'];
  $to = "ccs@thapar.edu";

  if(strpos($email, '@') != false && strpos($email, '.') != false){
    function IsInjected($str){
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

        if(IsInjected($email))
        {
            echo "Bad email value!";
            exit;
        }else{
          $match = "/(bcc:|cc:|content\-type:)/i";
          if (preg_match($match, $email) ||
              preg_match($match, $sub) ||
              preg_match($match, $mesg)) {
            die("Header injection detected.");
          }

          $headers = 'From: '.$email."\r\n".
          'Reply-To: '."ccs@thapar.edu"."\r\n" .
          'X-Mailer: PHP/' . phpversion();
          @mail($to, $sub, $mesg, $headers);
          echo 'OK';
        }
  }
?>
