<?php

/**
* @brief : Script qui défini la langue à appliquer
**/
	if(isset($HTTP_COOKIE_VARS['lang'])) 
	{
	     $lang = $HTTP_COOKIE_VARS['lang'];
	} 
	else 
	{
	     // si aucune langue n'est déclarée on tente de reconnaitre la langue par défaut du navigateur
	     if (isset( $HTTP_SERVER_VARS))
		 {
		 $lang = substr($HTTP_SERVER_VARS['HTTP_ACCEPT_LANGUAGE'],0,2); 
		 }
	}

     if ( isset( $_GET['lang'] ) )
	 {
		
		 if ($_GET['lang']=='fr') {           // si la langue est 'fr' (français) on inclut le fichier fr-lang.php
		 include('lang/fr-lang.php');
		 $lang = 'fr';
		 } 
		 
		 else if ($_GET['lang']=='en') {      // si la langue est 'en' (anglais) on inclut le fichier en-lang.php
		 include('lang/en-lang.php');
		 $lang = 'en';
		 }
		 
		 else { 		 // si aucune langue n'est déclarée on inclut le fichier fr-lang.php par défaut
		 include('lang/fr-lang.php');
		 $lang = 'fr';
		 } 
	}
	else
	{
		$lang = 'fr';
		include('lang/fr-lang.php');
	}

	  //définition de la durée du cookie (1 an)
	 $expire = 365*24*3600; 
 	 
 	 //enregistrement du cookie au nom de lang
	 setcookie("lang", $lang, time() + $expire); 
?>