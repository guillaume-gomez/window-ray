/**
* @brief : Classe principal du jeu
**/
function Game ()
{
	//////////////////////////////////////////////////////////////////////////////////
	// Attributs
	//////////////////////////////////////////////////////////////////////////////////
	var m_perso;
	var m_viewport;
	var m_level;
	var m_enemy;
	var m_background;
	var cell_size;
	var m_ray;

	///////////////////////////////////////////////////////////////////////////////////
	// Méthodes
	////////////////////////////////////////////////////////////////////////////////////
	
	/**
	*@brief : Definis les objets à construire
	**/
	this.setup = function () 
	{
		live_info = document.getElementById("live_info");
		cell_size = 30;
		gravity = 0.4;
		
		//Viewport
		m_viewport = new jaws.Viewport({max_x: jaws.width*1.5, max_y: jaws.height*1.5});
	 	
		m_perso = new Personnage("foo.png",64,205,85,m_viewport , 'gunFX');
		m_perso.constructor();	
		m_enemy = new Array;
		
		m_level = new TileSet(m_viewport, cell_size );
		m_level.constructor();
		
		m_ray = new RayOld ( 0 , 0 ,0, "light.png",m_viewport);
		m_ray.constructor();

        raytest = new Ray(new Point(0, 0), new Point(1,0), 240);
        raytest.detectEndRay(m_tile_map);
		
		MakeEnnemy();
		
		m_background = new Sound ('music.ogg','music.mp3');
		m_background.constructor();
		
		//Empêche les touches de bouger la fenetre du navigateur
		jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);

		StopSounds();
	}
	
	/**
	* @brief : Met a jour le canvas
	**/
	this.update = function () 
	{
		if ( jaws.pressed('r') )
		{
			resetAll();
		}
		
		if ( m_perso.isAlive() )
		{
			m_perso.update();
			m_perso.move(m_tile_map , m_enemy);
			m_viewport.centerAround(m_perso.getPlayer() );
		}
		else
		{
			resetLevel();
		}
		
		for( var i = 0 ; i < m_enemy.length ; i++ )
		{
			m_enemy[i].update(m_tile_map , m_perso , m_enemy);
		}
			
			
		if ( m_ray.IsReached() )
		{
			changeLevel();
		}
		
		m_ray.update(m_perso);
		
		m_background.update();			
			
		//Infos
		live_info.innerHTML = jaws.game_loop.fps + " fps. Player: " ;+ parseInt(m_perso.getX()) + "/" + parseInt(m_perso.getY()) + ". ";
       	live_info.innerHTML += "Viewport: " + parseInt(m_viewport.x) + "/" + parseInt(m_viewport.y) + ".";
	}
	
	/**
	*@brief : Dessine les objets
	**/
	this.draw = function ()
	{
		jaws.clear();
		raytest.draw(m_viewport);
		m_viewport.drawTileMap( m_level.getTileMap() ) ;
		m_viewport.draw(m_ray.getSpriteList());
		
		if ( m_perso.isAlive() )
		{
			m_viewport.draw(m_perso.getPlayer());
		}
		
		for ( var i = 0 ; i < m_enemy.length  ; i++)
		{
			m_viewport.draw(m_enemy[i].getPlayer());	
		}
		
		
		
		
	}
	
	/**
	* @brief : Lecture du nouveau niveau 
	**/
	function changeLevel ()
	{
		m_level.incrementcurrentLevel();
		m_level.loadLevel();
		m_enemy = new Array();
		m_ray.setReach(false);
	    MakeEnnemy();
	}
	
	/**
	* @brief : Reset le niveau
	**/
	function resetLevel ()
	{
		m_perso.setAlive(true);
		m_ray.setReach(false);
		m_ray.reset();
		MakeEnnemy();
	}
	
	function resetAll()
	{
		m_level.setcurrentLevel(1);
		m_level.loadLevel();
		m_perso.setAlive(true);
		m_ray.setReach(false);
		m_ray.reset();
		m_enemy = new Array();
		MakeEnnemy();
	}
	
	
	/**
	* @brief : Éteint le son 
	**/
	function StopSounds ()
	{
		m_background.stop();	
	}
		
	/**
	* @brief : Charge le tableau d'ennemie
	**/
	function MakeEnnemy ()
	{
		fname = "assets/enn_level"+m_level.getcurrentLevel()+".json";
		var xhr=createXHR();
		xhr.open("GET", fname,true);
		xhr.onreadystatechange = function( ) 
		{
		
			if (xhr.readyState == 4) 
			{
				if (xhr.status != 404) 
				{
					document.getElementById("debug").innerHTML = "found";
					var data=eval("(" + xhr.responseText + ")");
					document.getElementById("debug").innerHTML = "Menu" + data.menu + "<br>";
				
					for(i = 0; i < data.menu ; i++)
					{
						var sens = data.commands[i].sens || 1 ;
						m_enemy[i] = new Enemy ("droid.png",11,15,100,m_viewport , data.commands[i].x , data.commands[i].y , sens);
						m_enemy[i].constructor();
						// temporaire 
						document.getElementById("debug").innerHTML += "&nbsp;" + data.commands[i].x + ': ' + data.commands[i].y + "<br>"+data.x+"   "+data.y;
					}
					m_perso.setX( data.x) ;
					m_perso.setY( data.y);
					
					m_ray.setY( data.yLight );
					m_ray.setOrientation( -data.orientation );
					m_ray.reset();
					
				}
			
			} 
			else 
			{
					document.getElementById("debug").innerHTML = fname + " not found";
			}
		}
		xhr.send(null);
	}

	
//end of class
}

