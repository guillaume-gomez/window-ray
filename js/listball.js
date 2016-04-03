function ListBall ( _imageURL , viewport  , _songURL )
{
	////////////////////////////////////////////
	// Attributs
	///////////////////////////////////////////
	var m_spriteList ;
	var m_imageURL;
	var m_viewport;
	var m_sound;
	

	////////////////////////////////////////////
	// Méthodes
	///////////////////////////////////////////
	
	/**
	* @brief : Constructeur de la classe ListBall
	**/
	this.constructor = function ()
	{
		m_spriteList = new jaws.SpriteList();
		m_imageURL = _imageURL ;
		m_viewport = viewport;
		
		m_sound =  new Sound (_songURL+'.ogg', _songURL+'.mp3');
		m_sound.constructor();
	}
	
	/**
	*@brief : Met a jour la listBall
	*@param : position x origine de la ball
	*@param : position y origine de la ball
	**/
	this.update = function ( _x , _y , tile_map , direction)
	{	 
		for ( var i = 0 ; i < m_spriteList.length ; i++ )
		{
			move( i );
			
			//si on a une colission
			if(tile_map.atRect( m_spriteList.at( i ).rect()).length > 0)
			{
				this.deleteBall( i );
			}
			
			//si on sort du jeu
			 m_spriteList.removeIf( isOutsideCanvas );
			
		}
	
	}
	
	/**
	*@brief : Dessine la listBall
	**/
	this.draw = function ()
	{
		
		m_spriteList.draw();
	}
	
	
	/**
	* @brief : Accesseur de listBall
	**/
	this.getListBall = function ()
	{
		return m_spriteList;
	}
	
	/**
	*@brief : Accesseur d'une balle
	**/
	this.getBall = function ( index )
	{
		return m_spriteList.at( index ) ;
	}
	
	
	/**
	*@brief : Création de la balle et des divers traitement
	**/
	this.madeBall = function ( _x , _y , direction)
	{	
		//pour commencer le traitement je cherche le coeff directeur
		var deltaX = jaws.mouse_x +m_viewport.x - _x;
		var deltaY = jaws.mouse_y + m_viewport.y  - _y ;
	
		//je standardise une vitesse sur la composante x 

		var tempSprite = new jaws.Sprite({ x: _x , y : _y,image:m_imageURL });
			tempSprite.vx = 50 ;
			tempSprite.vy = (tempSprite.vx  * deltaY) / deltaX ;
			
			//ternaire pour orienté la balle comme il faut 
			var angle = deltaY >= 0 ? 90 : -90 ;
	
			tempSprite.angle =  angle -( 180 * Math.atan ( deltaX / deltaY ) )  /  Math.PI ; ;
				
			tempSprite.vx /= 10 ;
			tempSprite.vy /= 10 ;
			
			//ensuite on met a jour
			tempSprite.vx *= direction; 
			tempSprite.vy *= direction;
			
		m_spriteList.push( tempSprite );
			
	}
	
	/**
	* @brief : Gere la musique 
	**/
	this.SmadeBall = function ()
	{
		m_sound.play();
	}
	
	/**
	*@brief : pause la musique
	**/
	this.Spause = function ()
	{
		m_sound.pause();
	}
	
	/**
	* @brief : Accesseur d'un attribut de sound
	**/
	this.SsetReadAble = function ( value )
	{
		m_sound.setReadable(value) ;
	}
	
	
	/**
	*@brief : Création de la balle et des divers traitement
	**/
	this.madeBallIA = function ( _x , _y ,targetX , targetY, direction)
	{	
		//pour commencer le traitement je cherche le coeff directeur
		var deltaX = targetX - _x;
		var deltaY = targetY - _y ;
	
		//je standardise une vitesse sur la composante x mais on doit en discuter la siute
		//sur cette valeur 
		var tempSprite = new jaws.Sprite({ x: _x , y : _y,image:m_imageURL });
			tempSprite.vx = 50 ;
			tempSprite.vy = (tempSprite.vx  * deltaY) / deltaX ;
			
			//ternaire pour orienté la balle comme il faut 
			var angle = deltaY >= 0 ? 90 : -90 ;
	
			tempSprite.angle =  angle -( 180 * Math.atan ( deltaX / deltaY ) )  /  Math.PI ;
				
			tempSprite.vx /= 10 ;
			tempSprite.vy /= 10 ;
			
			//ensuite on met a jour
			tempSprite.vx *= direction; 
			tempSprite.vy *= direction;
			//alert ( tempSprite.angle);
		
			
		m_spriteList.push( tempSprite );
			
	}
	
	/**
	*@brief : Création de la balle seulement sur 2 angles ( Pi et -Pi )
	**/
	this.madeBallSimply = function (_x , _y , direction )
	{
			var tempSprite = new jaws.Sprite({ x: _x , y : _y,image:m_imageURL });
			tempSprite.vx = 5 * direction ;
			tempSprite.vy = 0 ;
			
			//ternaire pour orienté la balle comme il faut 
			var angle = tempSprite.vx >= 0 ? 90 : -90 ;
			tempSprite.angle =  90 - angle;
	
		m_spriteList.push( tempSprite );
	}
	
	
	/**
	*@brief : Detruction d'une balle et les traitements a faire
	**/
	this.deleteBall = function ( i )
	{
		m_spriteList.remove( m_spriteList.at( i ) );
	}
	
	/**
	*@brief : Gere les mouvement d'une  balle
	**/
	function move ( i )
	{
		m_spriteList.at( i ).move( m_spriteList.at( i ).vx ,  m_spriteList.at( i ).vy  );
	}
	
	/**
	* @brief : detection pour savoir si la balle est hors du canvas
	**/
	function isOutsideCanvas(item) { return (item.x < 0 || item.y < 0 || item.x > jaws.width + m_viewport.x || item.y > jaws.height + m_viewport.y) }
	
	/**
	*@brief : gere les balles
	*@note : concretement realise ce que fait une partie de update
	* mais de maniere public ( utilisable dans la fonction perso ou ennemie)
	**/
	this.manageBalls = function ( tile_map )
	{
	
		for ( var i = 0 ; i < m_spriteList.length ; i++ )
		{
			move( i );
			
			if( (tile_map.atRect( m_spriteList.at( i ).rect()).length > 0) || (  isOutsideCanvas( m_spriteList.at( i ).rect() )) )
			{
				this.deleteBall( i );
			}
		}
	
	}
	
}