"""Handle delete gallery requests."""

import pennington_photo
import flask
import arrow
from pennington_photo.common.model import get_db, check_session

@pennington_photo.app.route("/api/v1/delete/gallery/<gallery_id>/", methods=["POST"])
def del_gallery(gallery_id):
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    connection = get_db()
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
    cur = connection.execute(
        "DELETE FROM pictures "
        "WHERE pictureId = ? AND owner = ?",
        (
            picture_id,
            logname,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)
