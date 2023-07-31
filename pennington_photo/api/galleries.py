"""API endpoint for fetching galleries metadata & contents."""

import pennington_photo
import flask
from pennington_photo.common.model import get_db

@pennington_photo.app.route("/api/v1/galleries/")
def get_galleries():
    connection = get_db()
    
    cur = connection.execute(
        "SELECT * FROM galleries",
        ()
    )
    
    galleries = cur.fetchall()
    
    # for gallery in galleries:
    #     cur = connection.execute(
    #         "SELECT * FROM pictures WHERE galleryId = ? ORDER BY stars",
    #         (gallery["galleryId"],)
    #     )
    #     gallery["thumbnail"] = cur.fetchone()["uuid"]
    #     pass
    
    return flask.jsonify(galleries), 201


@pennington_photo.app.route("/api/v1/gallery/<gallery_id>/")
def get_gallery(gallery_id):
    pass
