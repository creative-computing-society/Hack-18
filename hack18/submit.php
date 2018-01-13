<?php
	$team_name = $_POST['tName'];
	$nm1 = $_POST['nm1'];
	$nm2 = $_POST['nm2'];
	$nm3 = $_POST['nm3'];
	$rn1 = $_POST['rn1'];
	$rn2 = $_POST['rn2'];
	$rn3 = $_POST['rn3'];
	$contact = $_POST['cntctnm'];
	$email = $_POST['email'];
	$message = "";
	if(strpos($team_name, '`') != false || strpos($team_name, '\'') != false || strpos($team_name, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($nm1, '`') != false || strpos($nm1, '\'') != false || strpos($nm1, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($nm2, '`') != false || strpos($nm2, '\'') != false || strpos($nm2, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($nm3, '`') != false || strpos($nm3, '\'') != false || strpos($nm3, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($rn1, '`') != false || strpos($rn1, '\'') != false || strpos($rn1, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($rn2, '`') != false || strpos($rn2, '\'') != false || strpos($rn2, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($rn3, '`') != false || strpos($rn3, '\'') != false || strpos($rn3, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($contact, '`') != false || strpos($contact, '\'') != false || strpos($contact, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}
	if(strpos($email, '`') != false || strpos($email, '\'') != false || strpos($email, '"') != false){	//DO NOT REMOVE != false
		$message= $message."Injection Attempt";
	}

	if($team_name == '' || $nm1 == '' || $rn1 == '' || $contact == '' || $email == ''){
		$message = $message."Required Fields missing";
	}else if(strlen($contact) != 10){
		$message = $message."Invalid Phone Number";
	}else if(strpos($email, '@') == false || strpos($email, '.') == false){
		$message = $message."Invalid Mail ID";
	}else{
		if($rn2 == '') $rn2 = 0;
		if($rn3 == '') $rn3 = 0;
		$link = mysqli_connect('localhost', 'root', 'password','hack182');
		$query = "INSERT INTO USERS (T_NAME, N1, N2, N3, R1, R2, R3, PHONE, MAIL) VALUES ('".$team_name."', '".$nm1."', '".$nm2."', '".$nm3."', '".$rn1."', '".$rn2."', '".$rn3."', '".$contact."', '".$email."');";
		if(mysqli_query($link, $query)){
			$message = $message."Added Successfully";
		}else{
			$message = $message."Error in query, ".mysqli_connect_error();
		}
	}
	echo $message;
?>
