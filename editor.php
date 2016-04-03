<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <title>Can you switch on the light ?</title>
	<link href='http://fonts.googleapis.com/css?family=Jura' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/designEditeur.css" type="text/css"  media="screen">
	<script src="js/jaws.js"></script>
	<script src="js/makeLevel.js"></script>
	<script src="js/editor.js"></script>
	<script src="js/makeIALevel.js"></script>
	<script src="js/ajax.js"></script>
</head>
<body>
	
	<div id="colonne1">
	<div id="moduleIA">
	<legend> Nombre d'ennemies</legend>
	<hr>
	<label> Nombres </label><input type="number" id="Number" min="0" max="20" step="1" title="Défini le nombre d'ennemis à placer dans le niveau" onChange="verifNumber(this.id);makeTab();" >
	</br>
	<span id ="tabIA">
	</span>
	</div>
	</br>
	</div>
	
	<div id="colonne2">
	<legend>Liste d'images</legend>
	<hr>
	<div id="liste-image">
	</div>
	</br>
	</div>
	
	<div id="centre">
	<canvas id="EditorCanvas" width="900" height="400">
		Votre navigateur n'est pas compatible !
	</canvas>
	<div id="debug"></div>
	<div id="live_info"></div>
	</br>
	
		<!-- Place this tag where you want the +1 button to render. -->
		<div class="g-plusone" data-size="tall" data-annotation="none"></div>

		<!-- Place this tag after the last +1 button tag. -->
		<script type="text/javascript">
		  window.___gcfg = {lang: 'fr'};

		  (function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		  })();
		</script>
	
	</br>
	<fieldset id="bordure" class="separation">
	<table cellspacing="50px">
	<tr>
	<td>
	<label name="scale" title="Pour changer les proportions de l'image courrante">Mise à l'échelle</label><input id="scale" type="number" step="0.1" min="0.1" max="3.0" name="scale" size="2" value="1" onchange="m_level.changeSouris(this.value)" />
	</td>
	<td>
	<label name="rotate" title="Pour changer la direction des element du decors">Rotation</label><input id="rotate" type="number" step="1" min="-360" max="360" name="scale"  value="0" onchange="" />
	</td>
	<td>
	<button type="button" onclick="m_level.sauvegarder()" class="myButton">Sauvegarder</button> 
	</td>
	</tr>
	</table>
	</fieldset>
	
	<fieldset id="fieldCurrent">
	<legend>Image Courante : </legend>
	<div id="image-courrante">
	</div>
	</fieldset>
	
	</div>
	
	<?php
		if(isset($_GET['level']))
			echo '<br>Niveau : '.$_GET['level'].' chargé';
	?>
			
	<p>
		<fieldset>
		<legend> Comment ? </legend>
		
		<img src="css/explication.jpg" width="650px" alt ="" style="float : left ;"/>
		
		<table id="commands" style="border-collapse:collapse;" >
		<caption>Commandes</caption>
		<tr><td class="keyword"><img  src="css/mouse-left.png" alt="Clic Gauche"             /></td><td  class="keyword">Placer un tile / Selectionner un tile  </td></tr>
		<tr><td class="keyword"><img src="css/mouse-right.png" alt="Clic Droit"              /></td><td  class="keyword">Supprimer la tile sélectionnée</td></tr>
		<tr><td class="keyword"><img src="css/toucheDirectionnelles.png" alt="Flèches directionnelles" /></td><td  class="keyword">Se deplacer dans le niveau </td></tr>
		<tr><td class="keyword"><img src="css/z.png" alt="Z"                       /></td><td  class="keyword"> Supprime la dernière tile</td></tr>
		<tr><td class="keyword"><img src="css/s.png" alt="S"                       /></td><td  class="keyword"> Sauvegarder le niveau</td></tr>
		<tr><td class="keyword"><img src="css/ctrl.png" alt="Ctrl"                    /></td><td  class="keyword"> Selectionner rapidement un énnemi</td></tr>
		<tr><td class="keyword"><img src="css/1.png" alt="1"                    /></td><td  class="keyword">Selectionner rapidement le héros</td></tr>
		<tr><td class="keyword"><img src="css/p.png" alt="p"                    /></td><td  class="keyword">Passer à l'image suivant</td></tr>
		<tr><td class="keyword"><img src="css/m.png" alt="m"                    /></td><td  class="keyword"> Passer à l'image précedente</td></tr>
		</table>
		
		
		</fieldset>
	</p>
	
	<p>Un Editeur crée par Guillaume Gomez</p>
	
	<div id="image-courrante-souris"></div>
	
	<script>
	
	window.onload = function()
    	{
			leveljson = "";
			<?php 
				$valide_extensions = array('jpg', 'jpeg', 'bmp', 'png');
				$dir = 'assets/editeur/';
				include 'loadFiles.php';
			?>
			
			jaws.assets.root = "assets/";
			jaws.assets.add([m_listImgURL]);
			<?php
				if(isset($_GET['level']))
				{
					echo 'jaws.assets.add("'.$_GET['level'].'");';
					echo 'leveljson = "'.$_GET['level'].'";';
				}
			?>
			
			

        	jaws.start(Editor);
    	}
	</script>
</body>
</html>
