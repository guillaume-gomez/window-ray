<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <title>Through the Window!</title>
    <link rel="stylesheet" href="css/design.css" type="text/css"  media="screen">
	<script src="js/jaws.js"></script>
	<script src="js/bundle.js"></script>
	<script src="js/geometry.js"></script>
	<script src="js/personnage.js"></script>
	<script src="js/enemy.js"></script>
	<script src="js/timer.js"></script>
	<script src="js/tileset.js"></script>
	<script src="js/sound.js"></script>
	<script src="js/listball.js"></script>
	<script src="js/diffraction.js"></script>
	<script src="js/game.js"></script>
	<script src="js/ajax.js"></script>
	<script src="js/ray.js"></script>
	
</head>
<?php require("decide-lang.php"); ?>
<body>

	<canvas id="gameCanvas" width="900" height="400">
		Votre navigateur n'est pas compatible !
	</canvas>
	</br>
	</br>
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
	
		<fieldset>
		<legend>Commandes : </legend>
		<table id="commands">
		<tr><td class="keyword"><img  src="css/mouse-left.png" alt="Clic Gauche "             /></td><td>: Changer le rayon </td></tr>
		<tr><td class="keyword"><img src="css/toucheDirectionnelles.png" alt="Flèches directionnelles" /></td><td>: Se deplacer </td></tr>
		<tr><td class="keyword"><img src="css/jump.png" alt="espace , haut"                       /></td><td>: Sauter </td></tr>
	    <tr></tr>
		<tr></tr>
		<tr></tr>
		<tr><td class="keyword"><img src="css/s.png" alt="S"                       /></td><td>: Musique(Pause) </td></tr>
		<tr><td class="keyword"><img src="css/ctrl.png" alt="Ctrl"                    /></td><td>: Musique (Reprise) </td></tr>
		<tr><td class="keyword"><img src="css/r.png" alt="r"                    /></td><td>: Reset </td></tr>
		</table>
		</fieldset>
		</br>
		
		<div id="debug"></div>
		
		<p>Un jeu crée par Guillaume Gomez</p>
	
	
	<h3>jaws log</h3>
	<div id="jaws-log"></div>
	<script>
	function playsOGG() { var audio = new Audio(); return !!audio.canPlayType && audio.canPlayType( 'audio/ogg; codecs="vorbis"' ) }
	function playsMP3() { var audio = new Audio(); return !!audio.canPlayType && audio.canPlayType( 'audio/mpeg;' ) }
	
	window.onload = function()
	{
		<?php 
		$valide_extensions = array('jpg', 'jpeg', 'bmp', 'png','json');
		$dir = 'assets/';
		include 'loadFiles.php';
		?>
			
			jaws.assets.root = "assets/";
			jaws.assets.add([m_listImgURL]);
		
		if(playsOGG())      { jaws.assets.add(["music.ogg"]) }
		else if(playsMP3()) { jaws.assets.add(["music.mp3"]) }

        	jaws.start(Game);
    	}
	</script>
</body>
</html>
