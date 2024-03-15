"""API endpoint for fetching galleries metadata & contents specifically for editing."""

import pennington_photo
import flask
from pennington_photo.common.model import get_db

@pennington_photo.app.route("/api/v1/admin/")
def get_admin():
    connection = get_db()
    
    cur = connection.execute(
        "SELECT * FROM galleries",
        ()
    )
    
    galleries = cur.fetchall()
    
    for gallery in galleries:
        cur = connection.execute(
            "SELECT * FROM pictures WHERE galleryId = ? ORDER BY stars DESC, ordernum",
            (gallery["galleryId"],)
        )
        img = cur.fetchone()
        if img is None:
            gallery["thumbnail"] = 'no-img.svg'
            pass
        else:
            gallery["thumbnail"] = img["uuid"]
            pass
        cur = connection.execute(
            "SELECT * FROM pictures WHERE galleryId = ? ORDER BY ordernum",
            (gallery["galleryId"],)
        )
        gallery["photos"] = cur.fetchall()
        
        for photo in gallery["photos"]:
            picture_id = photo["pictureId"]
            
            cur = connection.execute(
                "SELECT name, price, picturepriceId, s.sizenameId, pictureId as offered "
                "FROM sizenames s "
                "LEFT JOIN pictureprices p "
                "ON s.sizenameId = p.sizenameId "
                "AND pictureId = ? ",
                (picture_id,)
            )
            photo["sizes"] = cur.fetchall()
            pass
            
        pass
    
    cur = connection.execute(
        "SELECT username FROM users",
        ()
    )
    
    users = cur.fetchall()
    
    cur = connection.execute(
        "SELECT sizenameId, name FROM sizenames",
        ()
    )
    
    sizes = cur.fetchall()
    
    
    data = {
        "galleries": galleries,
        "users": users,
        "sizes": sizes
    }
    
    return flask.jsonify(data), 201
