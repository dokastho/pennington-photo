"""Handle requests for new galleries and photos."""

import pennington_photo
import arrow
import flask
from pennington_photo.common.model import get_db, check_session, get_uuid


SIZES = [
    {
        "info": "Matted 11\" x 14\" Print",
        "price": 300
    },
    {
        "info": "Matted 16\" x 20\" Print",
        "price": 500
    },
    {
        "info": "Matted 20\" x 24\" Print",
        "price": 800
    },
    {
        "info": "Matted 26\" x 32\" Print",
        "price": 1200
    },
    {
        "info": "Matted/Overmatted 16\" x 20\" Framed",
        "price": 450
    },
    {
        "info": "Matted/Overmatted 28\" x 28\" Framed",
        "price": 750
    },
    {
        "info": "Matted/Overmatted 22\" x 40\" Framed",
        "price": 950
    },
    {
        "info": "Matted/Overmatted 32\" x 40\" Framed",
        "price": 1450
    },
    {
        "info": "Mirror Image 22\" x 40\" Framed",
        "price": 1450
    },
    {
        "info": "Mirror Image 32\" x 40\" Framed",
        "price": 1750
    },
]


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
        
        cur = connection.execute(
            "SELECT pictureId "
            "FROM pictures "
            "WHERE uuid = ?",
            (uuid,)
        )
        picture_id = cur.fetchone()["pictureId"]
        
        for size in SIZES:
            info = size["info"]
            price = size["price"]
            
            cur = connection.execute(
                "INSERT INTO sizes "
                "(pictureId, owner, offered, info, price)",
                (picture_id, logname, False, info, price,)
            )
            cur.fetchone()
            pass
        
        pass
    
    # set gallery last-updated timestamp
    created = arrow.utcnow().format()
    cur = connection.execute(
        "UPDATE galleries "
        "SET created = ? "
        "WHERE galleryId = ? AND owner = ?",
        (
            created,
            galleryId,
            logname,
        )
    )
    cur.fetchone()
    
    return flask.redirect("/admin/")
