"""API endpoint for fetching galleries metadata & contents."""

import pennington_photo
import flask
import arrow
from pennington_photo.common.model import get_db

@pennington_photo.app.route("/api/v1/galleries/")
def get_galleries():
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
    
    return flask.jsonify(galleries), 201


@pennington_photo.app.route("/api/v1/gallery/<gallery_id>/")
def get_gallery(gallery_id):
    connection = get_db()
    
    cur = connection.execute(
        "SELECT * FROM galleries WHERE galleryId = ?",
        (gallery_id,)
    )
    
    gallery = cur.fetchone()
    
    cur = connection.execute(
        "SELECT * FROM pictures WHERE galleryId = ? ORDER BY ordernum",
        (gallery_id,)
    )
    
    gallery["photos"] = cur.fetchall()
    for photo in gallery["photos"]:
        cur = connection.execute(
            "SELECT price AS minprice FROM pictureprices "
            "WHERE pictureId = ? "
            "AND price > 0 "
            "ORDER BY price "
            "LIMIT 1",
            (photo["pictureId"],)
        )
        
        blob = cur.fetchone()
        photo["minprice"] = None
        if blob:
            photo["minprice"] = blob["minprice"]
    
    if gallery["description"] is None:
        gallery["description"] = ""
    
    if gallery["dateTaken"] is not None:
        dmy = gallery["dateTaken"]
        gallery["dateTaken"] = arrow.get(dmy).format("MMMM DD, YYYY")
        pass
    dmy = gallery["created"]
    gallery["created"] = arrow.get(dmy).humanize()
    
    return flask.jsonify(gallery), 201
