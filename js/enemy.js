/**
* @brief : Classe qui gere les ennemis 
**/

function Enemy(image,frame_width,frame_height,frame_duration , viewport , _x , _y   , sens )
{
	//////////////////////////////////////////////////////////////
	// Attributs
	/////////////////////////////////////////////////////////////
	var m_enemy;
    var m_speed;
	var m_jumpHeight;
	var m_tile_map;
	var m_timer;
	var m_sens;
	///////////////////////////////////////////////////////////////
	// Méthodes
	///////////////////////////////////////////////////////////////
	
	/**
	* @brief : Constructeur de la classe Personnage
	**/
    this.constructor = function()
	{
		//on définie la valeur des variables
		//@note : je voudrais par la suite que toutes les affectation se fasse dans le constructeur
		m_speed = 3;
		m_jumpHeight = 6;
		
		var xx = 0;
            xx =_x ;
		
		var yy = 0;
			yy = _y;
	  
		m_enemy = new jaws.Sprite({ scale : 2 ,x: xx, y: yy , anchor:"left_bottom"});
		m_enemy.animation = new jaws.Animation({sprite_sheet: jaws.assets.get(image), frame_size: [frame_width,frame_height], frame_duration: frame_duration , orientation :"center_bottom"});
		m_enemy.setImage(m_enemy.animation.frames[0]);
		m_enemy.go_right = m_enemy.animation.slice(12,14);
		m_enemy.go_left = m_enemy.animation.slice(10,12);
		
		
		m_enemy.vx = m_enemy.vy = 0;
		m_enemy.can_jump = true;
		
		m_timer = new Timer ();
		m_timer.constructor();
		m_sens = sens ||  1;

    }

	/**
	* @brief : Gestion des touches
	* @note : gravity est une variable globale
	* @note2 : peut servir si on veut manipuler les ennemies 
	*			sinon c'est globalement obsolete
	**/
    this.update = function(  tile_map ,perso , array_enemy) 
	{		
		this.move( tile_map , perso , array_enemy );	
    }
	 
	 /**
	 *@brief : Permet de mouvement du perso
	 *@note : Variable globale qui stocke le level
	 **/
	this.move = function (tile_map , perso , array_enemy)
	{
			// Gravité
			m_enemy.vy += gravity;
		    m_enemy.vx += m_speed;
			m_enemy.move( m_enemy.vx , 0 );	

		
			//Bloque le player s'il touche un objet
			//meme probleme que pour le hero, a quoi sert la colission entre perso
			if(tile_map.atRect(m_enemy.rect()).length > 0 )
			{ 
				if(m_enemy.vx > 0)
					m_enemy.setImage( m_enemy.animation.frames[10] );		
				if(m_enemy.vx < 0)
					m_enemy.setImage( m_enemy.animation.frames[12] );
					
				this.jump();
				m_enemy.move( - m_enemy.vx , 0 );
				m_speed = -m_speed;
			}		
			animate();	
			m_enemy.vx = 0;
			m_enemy.move( 0 , m_enemy.vy );					
			//Collision objets
			if(tile_map.atRect(m_enemy.rect())[0]) 
			{ 
				//Chute
				if(m_enemy.vy > 0)
				{
					m_enemy.can_jump = true ;
					m_enemy.moveTo( m_enemy.x , tile_map.atRect(m_enemy.rect())[0].rect().y - 0.001 );
					
				}
				//Saut
				else if(m_enemy.vy < 0) 
				{
					m_enemy.moveTo(m_enemy.x , tile_map.atRect(m_enemy.rect())[0].rect().bottom +m_enemy.height);
				}	
						
				m_enemy.vy = 0;
			}	
	}
	 
	/**
	* @brief : Accesseur de m_enemy
	**/
	this.getPlayer = function ()
	{
		return m_enemy;
	}

    /**
	*@brief : Dessine le personnage
	**/
    this.draw = function() 
	{
		m_enemy.draw();
  	  }
	
	/**
	*@brief : Accesseur de X
	**/
	this.getX = function()
	{
		return m_enemy.x;
	}
	
	/**
	*@brief : Accesseur de Y
	**/
	this.getY = function()
	{
		return m_enemy.y;
	}
	
	/**
	*@brief : Accesseur de Width
	**/
	this.getWidth = function()
	{
		 return m_player.width;
	}
	
	
	/**
	*@brief : Accesseur de Height
	**/
	this.getHeight = function()
	{
		 return m_player.height;
	}
	

	
	/**
	* @brief : Accesseur de m_mourant pour supprimer du tableau ennemi les morts
	**/
	this.getMourant = function ()
	{
		return m_timerMourant.getIntervalle();
	}
	
	this.getTempMourant = function ()
	{
		return m_dureeMort;
	}
		
	/**
	*@brief : Accesseur de rect
	**/
	this.getRect = function ()
	{
		
		return m_enemy.rect();
	
	}

	
	/**
	* @brief : deplace l'ennemie d'un point a un autre
	* @note : a placer dans update
	* @note : gere les collisions possibles ( enemy , perso , balles , level )
	*/
	this.move_to = function ( _xbegin , _ybegin , _xend , _yend , velocity)
	{
		//ternaire pour savoir ou aller 
			m_enemy.vx = _xend - _xbegin > 0 ? velocity : -velocity ;
			
		if (  m_enemy.x != _xend )
		{
		
			m_enemy.move( m_enemy.vx  , 0);
			animate( );		
		}
	}
	
	
	/**
	* @brief : Suicide
	* @note : on se sait jamais se peut servir 
	**/
	this.suicide = function ()
	{
		m_vie = false ;
		m_mourant = true;
		m_enemy.x = m_enemy.y = m_enemy.width = m_enemy.height = 0 ;
	}
	
	/**
	* @brief : Realise un saut
	**/
	this.jump = function ()
	{
		if ( m_enemy.can_jump  )
		{
			m_enemy.vy -= m_jumpHeight;
			m_enemy.can_jump = false;
		}
	}
	
	/**
	*@brief : Gestion de l'animation
	**/
	function animate ( )
	{
			
		if ( m_enemy.vx < 0 )
		{
			m_enemy.setImage( m_enemy.go_left.next() );
		}
		else if ( m_enemy.vx > 0 )
		{
			m_enemy.setImage( m_enemy.go_right.next() );
		}
					
	}
			
	//end of class
}
