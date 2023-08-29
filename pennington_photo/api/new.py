"""Handle requests for new galleries and photos."""

import pennington_photo
import flask
from pennington_photo.common.model import get_db, check_session, get_uuid


@pennington_photo.app.route("/api/v1/gallery/new/", methods=["POST"])
def new_gallery():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.form
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "description", "date"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    description = body["description"]
    if description == '':
        description = None
    date_taken = body["date"]
    if date_taken == '':
        date_taken = None
    files = flask.request.files.getlist('file')

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO galleries"
        "(owner, name, description, datetaken) "
        "VALUES (?, ?, ?, ?)",
        (
            logname,
            name,
            description,
            date_taken
        )
    )
    cur.fetchone()

    cur = connection.execute(
        "SELECT galleryId FROM galleries "
        "WHERE owner = ? AND name = ? "
        "ORDER BY created DESC",
        (
            logname,
            name
        )
    )
    galleryId = cur.fetchone()['galleryId']

    for file in files:
        uuid = get_uuid(file.filename)
        file.save(pennington_photo.app.config["UPLOADS_FOLDER"] / uuid)
        cur = connection.execute(
            "INSERT INTO pictures"
            "(galleryId, owner, name, uuid) "
            "VALUES (?, ?, ?, ?)",
            (
                galleryId,
                logname,
                file.filename,
                uuid,
            )
        )
        cur.fetchone()
        pass

    return flask.redirect('/admin/')


@pennington_photo.app.route("/api/v1/photo/new/", methods=["POST"])
def new_photo():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    connection = get_db()
    
    body = flask.request.form
    if body is None:
        flask.abort(400)
        pass
    keys = ["galleryId"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass
    
    photos = flask.request.files.getlist('file')
    if len(photos) == 0:
        flask.abort(400)
        pass
    
    galleryId = body["galleryId"]
    
    for file in photos:
        uuid = get_uuid(file.filename)
        file.save(pennington_photo.app.config["UPLOADS_FOLDER"] / uuid)
        cur = connection.execute(
            "INSERT INTO pictures"
            "(galleryId, owner, name, uuid) "
            "VALUES (?, ?, ?, ?)",
            (
                galleryId,
                logname,
                file.filename,
                uuid,
            )
        )
        cur.fetchone()
        pass
    
    return flask.redirect("/admin/")
