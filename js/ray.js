/**
 * @brief : Class qui cree et gere le rayon
 **/


function RayOld(_x, _y, orientation, urlIMG, viewport) {
    //////////////////////////////
    // Attributs
    /////////////////////////////
    var m_spriteListRay;
    var m_width;
    var m_orientation;
    var m_rayonOriginal;
    var m_orientationOriginal;
    var m_reached;
    var m_x;
    var m_y;


    /////////////////////////////
    // Méthodes
    ////////////////////////////

    this.constructor = function() {
        m_width = 0;
        m_orientation = orientation;
        m_orientationOriginal = orientation;
        m_spriteListRay = new jaws.SpriteList();
        m_rayonOriginal = new jaws.SpriteList();
        m_reached = false;
        m_x = _x;
        m_y = _y;

        makeRay(m_tile_map, m_x, m_y);
        // on fait une copie pour garder l'original
        /*for ( var i = 0 ; i < m_rayonOriginal ; i++)
		m_rayonOriginal.push( m_spriteListRay.at(i));*/

        for (var i = 0; i < m_spriteListRay.length; i++) {
            m_rayonOriginal.push(m_spriteListRay.at(i));
        }

    }


    this.update = function(perso) {
        this.manageRay(perso, m_tile_map);

    }

    this.getSpriteList = function() {
        return m_spriteListRay;
    }

    this.draw = function() {
        for (var i = 0; i < m_spriteListRay.length; i++) {
            m_spriteListRay.at(i).draw();
        }
    }

    function makeRay(m_tile_map, _x, _y) {
        //on charge un sprite juste pour le width
        var temp = new jaws.Sprite({
            x: _x,
            y: _y,
            image: urlIMG
        });
        m_width = 0;
        decalageY = 0;

        for (var i = 0; i < viewport.max_x; i += temp.rect().width) {
            //les conditions 
            if (m_orientation <= 0)
                decalageY = _y - i * Math.sin(Math.PI * (m_orientation) / 180);
            else
                decalageY = _y + i * Math.sin(Math.PI * (-m_orientation) / 180);


            if (Math.abs(m_orientation) >= 0 && Math.abs(m_orientation) <= 90)
                decalageX = _x + i * Math.abs(Math.cos(Math.PI * (m_orientation) / 180));
            else
                decalageX = _x - i * Math.abs(Math.cos(Math.PI * (m_orientation) / 180));


            //creation de tile
            var tmpSprite = new jaws.Sprite({
                x: decalageX,
                y: decalageY,
                image: urlIMG,
                alpha: 0.75
            });
            tmpSprite.angle = -m_orientation;

            // on cherche si on a une collission
            blocks = m_tile_map.atRect(tmpSprite.rect());
            if (blocks.length > 0) {
                if (JSON.parse(blocks[0].toJSON()).image == "switch.png")
                    m_reached = true;
                i = viewport.max_x;
            } else {
                m_spriteListRay.push(tmpSprite);
            }
            m_width += temp.rect().width;
        }

    }



    this.manageRay = function(perso, m_tile_map) {
        var collide = false;
        var index = 0;

        for (var i = 0; i < m_spriteListRay.length; i++) {
            if (jaws.collideRects(perso.getWen(), m_spriteListRay.at(i).rect())) {
                m_spriteListRay.at(i).angle = perso.getAngleReflexion();
                index = i;
                collide = true;
            }
        }



        if (collide) {
            for (var i = m_spriteListRay.length; i > index + 1; i--) {
                m_spriteListRay.pop()
            }
            m_orientation = -perso.getAngleReflexion();
            makeRay(m_tile_map, m_spriteListRay.at(index).rect().x, m_spriteListRay.at(index).rect().y);
        } else {
            for (var i = 0; i < m_spriteListRay.length; i++) {
                m_spriteListRay.pop();
                //alert ( m_spriteListRay.at(i).angle+'   '+m_orientationOriginal);
                //if ( m_spriteListRay.at(i).angle != Math.abs(m_orientationOriginal) )
                //	m_spriteListRay.remove( m_spriteListRay.at(i) );
            }
            m_spriteListRay = new jaws.SpriteList();
            for (var i = 0; i < m_rayonOriginal.length; i++) {
                m_rayonOriginal.at(i).angle = -m_orientationOriginal;
                m_spriteListRay.push(m_rayonOriginal.at(i));
            }

        }

    }

    this.IsReached = function() {
        return m_reached;
    }

    this.setX = function(_x) {
        m_x = _x;
    }

    this.setY = function(_y) {
        m_y = _y;
    }

    this.setOrientation = function(_o) {
        m_orientationOriginal = _o;
        m_orientation = _o;
    }

    this.reset = function() {

        m_spriteListRay = new jaws.SpriteList();
        m_rayonOriginal = new jaws.SpriteList();

        makeRay(m_tile_map, m_x, m_y);
        // on fait une copie pour garder l'original
        /*for ( var i = 0 ; i < m_rayonOriginal ; i++)
		m_rayonOriginal.push( m_spriteListRay.at(i));*/

        for (var i = 0; i < m_spriteListRay.length; i++) {
            m_rayonOriginal.push(m_spriteListRay.at(i));
        }

    }

    this.setReach = function(_r) {
        m_reached = _r;
    }

}