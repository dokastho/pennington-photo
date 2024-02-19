"""Handle delete gallery requests."""

import pennington_photo
import flask
import arrow
from pennington_photo.common.model import get_db, check_session
import os

@pennington_photo.app.route("/api/v1/delete/gallery/<gallery_id>/", methods=["POST"])
def del_gallery(gallery_id):
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    connection = get_db()
    # delete photo files
    cur = connection.execute(
        "SELECT uuid FROM pictures WHERE galleryId = ?",
        (gallery_id,)
    )
    uuids = cur.fetchall()
    uuid: str
    for uuid in uuids:
        os.remove(pennington_photo.app.config["UPLOADS_FOLDER"] / uuid["uuid"])
        pass
    
    cur = connection.execute(
        "DELETE FROM galleries "
        "WHERE galleryId = ? AND owner = ?",
        (
            gallery_id,
            logname,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)


@pennington_photo.app.route("/api/v1/delete/photo/<picture_id>/", methods=["POST"])
def del_photo(picture_id):
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    connection = get_db()
    # delete file
    cur = connection.execute(
        "SELECT uuid FROM pictures WHERE pictureId = ?",
        (picture_id,)
    )
    uuid = cur.fetchone()["uuid"]
    os.remove(pennington_photo.app.config["UPLOADS_FOLDER"] / uuid)
     
    cur = connection.execute(
        "DELETE FROM pictures "
        "WHERE pictureId = ? AND owner = ?",
        (
            picture_id,
            logname,
        )
    )
    cur.fetchone()
    
    # set gallery last-updated timestamp
    created = arrow.utcnow().format()
    cur = connection.execute(
        "SELECT galleryId "
        "FROM pictures "
        "WHERE pictureId = ?",
        (picture_id,)
    )
    gallery_id = cur.fetchone()["galleryId"]
    cur = connection.execute(
        "UPDATE galleries "
        "SET created = ? "
        "WHERE galleryId = ? AND owner = ?",
        (
            created,
            gallery_id,
            logname,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)
