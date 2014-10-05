<?php
$requestURI = explode('/', $_SERVER['REQUEST_URI']);
$scriptName = explode('/',$_SERVER['SCRIPT_NAME']);
 
for($i= 0;$i < sizeof($scriptName);$i++)
        {
      if ($requestURI[$i] == $scriptName[$i])
              {
                unset($requestURI[$i]);
            }
      }
 
$command = array_values($requestURI);

$project = strtolower((isset($command[0])) ? $command[0] : "");

function base_url(){
    return 'http://localhost:8000/';
}
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
	<link href="./css/styles.css" rel="stylesheet" type="text/css" media="screen" /> 
	<link href="http://fonts.googleapis.com/css?family=Roboto:regular,medium,thin,italic,mediumitalic,bold" rel="stylesheet" type="text/css" media="screen" /> 
	<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
	<link href="./css/syntax/shCore.css" rel="stylesheet" type="text/css"/> 
	<link href="./css/syntax/shThemeDefault.css" rel="stylesheet" type="text/css"/>
	<script></script>
</head>
<body>

	<?php
		if(file_exists($project.".php")){
			require_once($project.".php");
		}
		else{
	?> 
		<div id="home-wrapper" >
			<div class="logo"><img src="./image/logo.png" width="222"></div>
			<div class="card"
				<h1>Alex Cheuk<span class="title">web & mobile developer XD</span> <?php echo $project ?></h1>
				<table cellspacing="0" cellspadding="0">
					<tr>
						<td>email:</td>
						<td><a href="mailto:cheuk.alex@gmail.com">cheuk.alex@gmail.com</a></td>
					</tr>
					<tr>
						<td>linkedin:</td>
						<td><a href="http://ca.linkedin.com/pub/alex-cheuk/36/307/132">LinkedIn Profile</a></td>
					</tr>
					<tr>
						<td>Github:</td>
						<td><a href="https://github.com/alexcheuk">Github Profile</a></td>
					</tr>
				</table>
				<div class="pro-title">Proficient in</div>
				<img src="/image/javascript.png" title="Javascript"/>
				<img src="/image/html5.png" title="HTML5"/>
				<img src="/image/android.png" title="Android"/>
				<img src="/image/phonegap.png" title="PhoneGap"/>
			</div>
		</div>
	<?php } ?>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="./scripts/shCore.js"></script>
<script src="./scripts/shBrushJScript.js"></script>
<script src="./scripts/shBrushXml.js"></script>
<script src="./scripts/main.js"></script>
</body>
</html>