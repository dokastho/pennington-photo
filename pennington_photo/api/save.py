"""Handle edits for gallery requests."""

import pennington_photo
import flask
import arrow
from pennington_photo.common.model import get_db, check_session


@pennington_photo.app.route("/api/v1/save/gallery/<gallery_id>/", methods=["POST"])
def save_gallery(gallery_id):
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "description", "dateTaken"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    description = body["description"]
    date_taken = body["dateTaken"]
    created = arrow.utcnow().format()

    connection = get_db()
    cur = connection.execute(
        "UPDATE galleries "
        "SET name = ?, description = ?, dateTaken = ?, created = ? "
        "WHERE galleryId = ? AND owner = ?",
        (
            name,
            description,
            date_taken,
            created,
            gallery_id,
            logname,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)


@pennington_photo.app.route("/api/v1/save/photo/<picture_id>/", methods=["POST"])
def save_photo(picture_id):
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "description", "stars"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    description = body["description"]
    stars = body["stars"]
    created = arrow.utcnow().format()

    connection = get_db()
    cur = connection.execute(
        "UPDATE pictures "
        "SET name = ?, description = ?, stars = ?, created = ? "
        "WHERE pictureId = ? AND owner = ?",
        (
            name,
            description,
            stars,
            created,
            picture_id,
            logname,
        )
    )
    cur.fetchone()

    # set gallery last-updated timestamp
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
