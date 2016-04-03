<?php
				$liste = array();
				
				$Ressource = opendir($dir);
				while($fichier = readdir($Ressource))
				{
					$berk = array('.', '..');

					$test_Fichier = $dir.$fichier;

					if(!in_array($fichier, $berk) && !is_dir($test_Fichier))
					{
						$ext = pathinfo($fichier,  PATHINFO_EXTENSION);

						if(in_array($ext, $valide_extensions))
						{
							array_push($liste,$fichier);
						}
					}
				}
				
				echo 'm_listImgURL = new Array (';
				$last_key = sizeof($liste) -1;
				foreach($liste as $k => $v)
				{
					
					if($k === $last_key)
						echo '"'.$v.'"';
					else
					echo '"'.$v.'",';
				}
				echo ');';
?>