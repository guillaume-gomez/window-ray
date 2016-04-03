<?php
require_once "ScriptPHPtoJS.php";
require_once 'Fichier.php';

	class FichierGame extends Fichier
	{

		/**
		* @brief : méthodes précise pour le jeu
		**/
		public function deleteBalises()
		{
			$this->c_buff = strip_tags($this->c_buff);
		}
			
	}
	
	$test = new FichierGame('1.xml');
	$test->readFichier();
	$test->deleteBalises();
	
	$tab = $test->c_buff;
	$tab = replace_newline($tab);
	$js = php2js($tab);


?>

<script type="text/javascript">

  var tab =<?php echo $js; ?>  ;
  
  var _number = tab.substr(0,2) ;
  var _width  =  tab.substr(2,3);
  var _height =  tab.substr(5,3);
  var _level  =  tab.substr(8);
  
   alert ( _number + " " + _width + " " + _height);
  
   _number = parseInt(_number , 10) ;
   _width  = parseInt(_width , 10) ;
   _height = parseInt(_height , 10 );
   
   alert ( _level);

  
</script>