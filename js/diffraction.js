function Diffraction (  viewport   )
{
	////////////////////////////////////////////
	// Attributs
	///////////////////////////////////////////
	var m_viewport;
	
	////////////////////////////////////////////
	// Méthodes
	///////////////////////////////////////////
	/**
	* @brief : Constructeur de la classe ListBall
	**/
	this.constructor = function ()
	{
		m_viewport = viewport;
	}
	
	/**
	*@brief : Met a jour la listBall
	*@param : position x origine de la ball
	*@param : position y origine de la ball
	**/
	this.update = function ( _x , _y , tile_map , direction)
	{	 

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

		var tempSprite = new jaws.Sprite({ x: _x , y : _y});
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
		
		return tempSprite.angle;
			
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
	
	
}