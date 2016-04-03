<?php
	class Fichier
	{
		private $s_buff;
		private $s_filename;
		
		/**
		* @brief : Constructeur de la classe Fichier
		**/
		public function __construct($filename)
		{
		
			$this->s_filename = $filename ;
			$this->s_buff = '';
		
		}
		
		/**
		* @brief : Lecture d'un fichier 
		**/
		public function readFichier()
		{
			$this->s_buff = file_get_contents($this->s_filename); 
		}
		
		/**
		* @brief : Ecris dans un fichier 
		* @param : le texte que l'on veut ajouter
		**/
		public function writeFichier( $stextToWrite)
		{
			$scurrent = file_get_contents($this->s_filename);
			$scurrent .= $stextToWrite;
      
			file_put_contents($this->s_filename , $scurrent);
    
		}
		
		/**
		* @brief : Accesseur de la classe
		**/
		public function __get($property)
        {
        if('c_buff' === $property)
          {
          return $this->s_buff;
		     }
          else 
          {
          throw new Exception('Propriété invalide !');
          }
        }
        
	
	
	}
	
?>

