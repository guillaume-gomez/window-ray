function MakeLevel (  cell_size , listeURLimg , viewport, listEnnemies)
{

	/////////////////////////////////////////////////
	// Attributs
	/////////////////////////////////////////////////
	var m_tile_map;
	var m_background;
	var m_currentImg;
	var m_viewport;
	var saveName = "nom_du_level";
	var m_indiceIMG = 0;
	var m_nbEnnemy ;
	var m_lockButton;
	var m_lockButton2;
	var m_spriteListEnnemys;
	var m_spriteList;
	var m_spriteLight;
	var m_filenameHero ;
	var m_spriteHero;
	var m_indiceHero;
	var m_indiceEnnemie;
	var m_filenameLight;
	/////////////////////////////////////////////////
	// Méthodes 
	/////////////////////////////////////////////////

	/**
	* @brief : Constructeur de la classe MakeLevel
	**/
	this.constructor = function ()
	{
		if(leveljson != "")
			saveName = leveljson;
			
		image_courrante = document.getElementById('image-courrante');
	
		m_currentImg = new Array();
		
		for ( var i = 0 ; i < listeURLimg.length ; i++ )
			m_currentImg[ i ] =  listeURLimg[ i ];
		
		m_viewport = viewport;
		m_viewport.x = 0;
		m_viewport.y = 9999;
		
		m_nbEnnemy = 0 ;
		
		m_spriteListEnnemys = new jaws.SpriteList();
	    m_spriteList = new jaws.SpriteList();
		
		
		if(leveljson != "")
		{
			m_spriteList.load(jaws.assets.get(leveljson));
			MakeEnnemy ("enn_"+leveljson);
		}
				
		m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
		
		this.drawImageCurrent();
		
		m_filenameHero  = "hero.png";
	    m_spriteHero = new  jaws.Sprite({image: m_filenameHero, x: 0, y: 0});
		
		m_filenameLight = "light2.png";
		m_spriteLight = new jaws.Sprite({image: m_filenameLight, x: 0, y: 100});
		
		m_lockButton = false;	
		m_lockButton2 = false;
		
		m_indiceHero = 0 ;	
		m_indiceEnnemie = 0 ;
		findHero();
		findEnnemie();
	}
	

	/**
	* @brief : Gestion des touches 
	**/
	this.update = function (viewport)
	{
		
	
		//Dessine une tile
		if ( jaws.pressed("left_mouse_button") )
		{
			//environnement
			if ( isValid() && !IsEnnemy() )
			{
				if ( IsHero() )
				{
					m_spriteHero.x = ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size;
					m_spriteHero.y = (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size;
				}
				else if ( IsLight() )
				{
					m_spriteLight.y = (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size;
					var angle = document.getElementById('rotate').value || 0;
					m_spriteLight.angle = parseInt(angle) ;
				}
				else
				{
					temp = new jaws.Sprite({x: ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size , y :  (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size,image: m_currentImg[ m_indiceIMG ], scale:document.getElementById('scale').value});
					var angle = document.getElementById('rotate').value || 0;
					temp.angle = parseInt(angle) ;
					m_spriteList.push( temp );
				}
			}
			//ennemis
			else if ( isValid()  && !lockButton )
			{
				manageEnnemies();
				lockButton = true ;
			}
		}
		else
		{
			lockButton = false ;
		}

		//Supprime la dernière tile
		jaws.on_keydown("z",function() {m_spriteList.pop();} );

		//Supprime la tile sélectionnée
		if ( jaws.pressed("right_mouse_button") )
		{
			if ( !IsEnnemy() )
			{
				m_spriteList.remove( m_tile_map.at(jaws.mouse_x + viewport.x,jaws.mouse_y + viewport.y)[0] );
			}
			else if ( !m_lockButton2)
			{ 
			  m_spriteListEnnemys.remove( m_tile_map.at(jaws.mouse_x + viewport.x,jaws.mouse_y + viewport.y)[0] );
			  removeEnnemies();
			  m_lockButton2 = true ;
			}
		}
		else
		{
			m_lockButton2 = false ;
		}
		
		if ( jaws.pressed("p") )
		{
			m_indiceIMG++;
			this.drawImageCurrent();
			this.changeSouris();
		}
		
		if ( jaws.pressed("m") )
		{
			m_indiceIMG--;
			this.drawImageCurrent();
			this.changeSouris();
		}
		
		
		if ( jaws.pressed("1") )
		{
			m_indiceIMG = m_indiceHero;
			this.drawImageCurrent();
			this.changeSouris();
		}
		
		if ( jaws.pressed("ctrl") )
		{
			m_indiceIMG = m_indiceEnnemie;
			this.drawImageCurrent();
			this.changeSouris();
		}
		
		
		m_tile_map.clear();
		m_tile_map.push(m_spriteList);
		m_tile_map.push(m_spriteListEnnemys);
		
		//Sauvegarde la tilemap
		jaws.on_keydown("s",this.sauvegarder);

	}
	
	/**
	* @brief : Retourne la spriteList
	**/
	this.getSpriteList = function ()
	{
		return m_spriteList;
	}
	
	/**
	*@brief : Retourne le perso
	**/
	this.getSpriteHero = function ()
	{
		return m_spriteHero;
	}
	
	/**
	* @brief : Retourne les ennemies
	**/
	this.getSpriteEnnemy = function ()
	{
		return m_spriteListEnnemys;
	}
	
	this.getSpriteLight = function ()
	{
		return m_spriteLight;
	}
	
	/**
	*@brief : Sauvegarde le niveau
	**/
	this.sauvegarder = function ()
	{
		var test = "[" + m_spriteList.map( function(m_spriteList) { return m_spriteList.toJSON() }) + "]";
		
		var levelname = prompt("Saisissez le nom du niveau :", saveName);
		var isViable = false;
		
		//on verifie si il y a une porte 
		for ( var i = 0 ; i < m_spriteList.length ; i++)
		{
			if ( JSON.parse(m_spriteList.at( i ).toJSON()).image == 'switch.png' )
			{	
				isViable = true ;
			}
		}
		
		if ( !isViable )
		{
			alert ('Il manque un interrupteur dans le niveau');
		}
		
		if(levelname && isViable)
		{
			var typeFichier = levelname.indexOf('.json');
			typeFichier = ( typeFichier != -1) ? '' : '.json' ;
			saveName = levelname+''+typeFichier;
			test = "levelname="+saveName+"&level=" + test
			var test2 = "levelname="+saveName+"&level=";
			var req = new XMLHttpRequest();
			req.open("POST", "sauvegarder.php", true)      
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.send(test);
			
			var nbPlayers = document.getElementById('Number').value || 0 ;
			
			if ( nbPlayers >0 )
			{
				var req2 = new XMLHttpRequest();
				req2.open("POST", "sauvegarderEnnemies.php", true)      
				req2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req2.send(test2 + makeTabPerso () );
				
			}

			self.location.href='editor.php?level='+saveName;
			saveName='';
		}
	}
	
	
	/**
	* @brief: Sauvegarde le tableauEnnemie
	**/
	function makeTabPerso()
	{
	  var nbPlayers = document.getElementById('Number').value || 0 ;
	  var chaine = '';
	
	  for ( var i = 0 ; i <nbPlayers ; i++)
	  {
	    chaine += "{";
		var val =  document.getElementById("x["+i+"]").value;
		chaine += '"x":'+val+',';
		var val =  document.getElementById("y["+i+"]").value;
		chaine+= '"y":'+val;
		chaine += "}";
		
		if ( i +1 !=nbPlayers)
			chaine += ',';
	  }
	  chaine = '{"menu": '+nbPlayers+',"commands":['+chaine+'] , "x":'+m_spriteHero.x+' , "y": '+m_spriteHero.y+' ,"yLight":'+m_spriteLight.y+',"orientation":'+Math.abs(m_spriteLight.angle)+'}';
	  document.getElementById("debug").value = chaine ;
	 // alert (chaine);
	 return chaine;
	}
	
	
	/**
	* @brief : Ecrit dans le html l'image qui sera dessinée
	**/
	 this.drawImageCurrent  = function( )
	{
		var path = 'assets/';
		var url = path + m_currentImg[ m_indiceIMG ] ;
		
		var idImage = document.getElementById(m_indiceIMG);
		var ratio = 1 ;
		if ( idImage != null )
		{
		
			for ( var i = 0 ; i < idImage.width && idImage.width % 3 != 0 ; i+=10)
			{
				if ( i % 3 == 0 )
				{
				  ratio = i/100; 
				}
			}
		}
		
		var _scale = document.getElementById('scale');
		_scale.value = ratio  ;
		
		image_courrante.innerHTML = '<img src="'+url+'" width="'+this.width*ratio+'">';
		image_courante_souris.innerHTML = '<img src="'+url+'" width="'+this.width*ratio+'" >';
	}
	
	this.changeSouris = function ( value_ratio )
	{
	  var path = 'assets/';
	  var url = path + m_currentImg[ m_indiceIMG ] ;
		
	  image_courante_souris.innerHTML = '';
	  image_courante_souris.innerHTML = '<img src="'+url+'" whith="17" >';
	  
	}
	
	
	/**
	*@brief : Accesseur pour m_indiceIMG
	**/
	this.setIndice = function( newIndice)
	{m_indiceIMG = newIndice;}
	
	
	/**
	*@brief : Revoit la tile_map qui contient tout le niveau
	**/
	this.getTileMap = function()
	{return m_tile_map;}
	
	/**
	*@brief : change l'image de fond sur le canvas
	**/
	this.changeBackground = function ()
    {
			background.setImage(document.getElementById('background').value);
    }
	
	
	
	/**
	* @brief :Retourne la largeur d'une image pour l'indice
	**/
	this.getWidth = function ( index )
	{
		return m_spriteList.at( index );//.rect().width;
	}
	
	/**
	* @brief :Retourne la hauteur d'une image pour l'indice
	**/
	this.getHeight = function ( index )
	{
		return m_spriteList.at( index ).rect().height;
	}
	
	
	/**
	* @brief : Retourne la position de la souris sur le canvas
	**/
	this.getCamX = function ()
	{
		return m_viewport.x ;
	}
	
	/**
	* @brief : Retourne la position de la souris sur la canvas
	**/
	this.getCamY = function ()
	{
		return m_viewport.y ;
	}
	
	/**
	* @brief : Definie le nombre d'ennemie qu'il y aura a stocker
	**/
	this.setEnnemy = function ( variable )
	{
		m_nbEnnemy = variable ;
	}
	
	/**
	* @brief : Verifie si on peut dessiner dans la zone qui est cliquée
	**/
	function isValid()
	{
		var _y = (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size;
		var _x = ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size;
			// si on est en dehors de l'ecran 
		
			if( _x >= 0 && _x < viewport.max_x && _y >= 0 && _y < viewport.max_y)
				if (!m_tile_map.at(jaws.mouse_x + viewport.x,jaws.mouse_y + viewport.y)[0])//New!!
					return true ;
					
		return false ;
	}
	
	/**
	* @brief : Verifie si on doit stocker le tiles en tant que niveau ou joueur
	**/
	function IsEnnemy ()
	{
	
		for ( var i=0; i <  listEnnemies.length ; i++)
		{
		   if ( m_currentImg[ m_indiceIMG ] == listEnnemies[i] )
		   {
			return true ;
		   }
	   
	   }
	   
	   return false;
	}
	
	/**
	* @brief : Verifie si on doit stocker le tiles en tant que niveau ou joueur
	**/
	function IsHero ()
	{
		return   m_currentImg[ m_indiceIMG ] == m_filenameHero;
	}
	
	function IsLight ()
	{
		return m_currentImg[ m_indiceIMG ] == m_filenameLight;
	}
	
	/**
	* @brief :  gestion des données a transmettre pour la sauvegarder des positions ennemies
	**/
	function manageEnnemies ()
	{			
		
		var nb =  document.getElementById("Number").value  ;
	
			if ( nb > 0 )
			{
				for ( var i = 0 ;  i < nb ; i++ )
				{
					var coordEnnemyX = document.getElementById("x["+i+"]").value ;
					if ( coordEnnemyX == ''  && isValid())
					{
					   document.getElementById("y["+i+"]").value  =  (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size; 
					   document.getElementById("x["+i+"]").value  =  ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size; 
					   
					   
					   document.getElementById("y["+i+"]").disabled = false ;
					   document.getElementById("x["+i+"]").disabled  = false; 
					   
					   m_spriteListEnnemys.push(new jaws.Sprite({ x: ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size , y :  (jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y) % cell_size,image: m_currentImg[ m_indiceIMG ], scale:document.getElementById('scale').value}));
					   
					  m_nbEnnemy++;
					 i =  nb ;
					}
				
				}
			}
	}
	
	/**
	* @brief :  gestion des données a supprimer les positions ennemies
	**/
	function removeEnnemies()
	{
			if ( m_nbEnnemy >= 0 )
			{
				for ( var i = 0 ;  i < m_nbEnnemy ; i++ )
				{
					if ( document.getElementById("x["+i+"]").value != '' && document.getElementById("y["+i+"]").value != '' )
					{
						var coordEnnemyX = document.getElementById("x["+i+"]").value ;
						var coordEnnemyY = document.getElementById("y["+i+"]").value ;
						var mouseX  = ( jaws.mouse_x + viewport.x) - (jaws.mouse_x + viewport.x)% cell_size;
						var mouseY  = ( jaws.mouse_y + viewport.y) - (jaws.mouse_y + viewport.y)% cell_size ;
						if ( coordEnnemyX ==  mouseX && coordEnnemyY == mouseY )
						{
						   document.getElementById("y["+i+"]").value  = ''; 
						   document.getElementById("x["+i+"]").value  = ''; 
											   
						 i = m_nbEnnemy ;
						 m_nbEnnemy--;
						}
					}
				}
			}
			
			
	
	}
	
	/**
	* @brief : Charge le tableau d'ennemie
	* @note ; si d'autres ennemis sont ajouter verifié la direction
	**/
	function MakeEnnemy (level)
	{
		fname = "assets/"+level;
		var xhr=createXHR();
		xhr.open("GET", fname,true);
		xhr.onreadystatechange = function( ) 
		{
		
			if (xhr.readyState == 4) 
			{
				if (xhr.status != 404) 
				{
					var data=eval("(" + xhr.responseText + ")");
					document.getElementById("Number").value = data.menu;
					m_nbEnnemy = data.menu
					makeTab();
				
					for(i = 0; i < data.menu ; i++)
					{
						var sens = data.commands[i].sens || 1 ;
						
						var fileEnn =  "ennemy.png";
						document.getElementById("x["+i+"]").value =  data.commands[i].x;
						document.getElementById("y["+i+"]").value = data.commands[i].y;
						
						 m_spriteListEnnemys.push(new jaws.Sprite({ x:  data.commands[i].x , y : data.commands[i].y ,image: fileEnn, scale:document.getElementById('scale').value}));
					}
					m_spriteHero.x=  data.x ;
					m_spriteHero.y= data.y;
					
					m_spriteLight.x = 0 ; 
					m_spriteLight.y = data.yLight ; 
					m_spriteLight.angle = -data.orientation;
				}
			
			} 
			
		}
		xhr.send(null);
	}
	
	/**
	* @brief : Recherche le héros
	**/
	function findHero ()
	{
			for ( var i = 0 ; i < m_currentImg.length ; i++ )
			{
				if ( m_currentImg[i] == m_filenameHero )
				{
					m_indiceHero = i ;
			   }
			}
			
	}
	
	/**
	* @brief : Recherche le premier ennemie de la liste d'ennemies
	**/
	function findEnnemie ()
	{
		for ( var i = 0 ; i < m_currentImg.length ; i++ )
			{
				if ( m_currentImg[i] ==  listEnnemies[0] )
				{
					m_indiceEnnemie = i ;
			   }
			}
	}
	
//end of class
}

