<?php
$filename = 'assets/'.$_POST['levelname'];

if (!$fp = fopen($filename, 'w+'))
{
	echo "Echec de l'ouverture du fichier";
	exit;
}
else 
{
	fwrite($fp, $_POST['level']);
	fclose($fp);
}
?>