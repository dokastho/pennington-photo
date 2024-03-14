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

    keys = ["name", "description", "dateTaken", "type"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    description = body["description"]
    date_taken = body["dateTaken"]
    gallery_type = body["type"]
    created = arrow.utcnow().format()

    connection = get_db()
    cur = connection.execute(
        "UPDATE galleries "
        "SET name = ?, description = ?, dateTaken = ?, created = ?, type = ? "
        "WHERE galleryId = ?",
        (
            name,
            description,
            date_taken,
            created,
            gallery_type,
            gallery_id,
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
        "WHERE pictureId = ?",
        (
            name,
            description,
            stars,
            created,
            picture_id,
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
        "WHERE galleryId = ?",
        (
            created,
            gallery_id,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)


@pennington_photo.app.route("/api/v1/save/pictureprice/select/", methods=["POST"])
def select_size():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["pictureId", "sizenameId"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    connection = get_db()
    cur = connection.execute(
        "INSERT INTO pictureprices "
        "(owner, pictureId, sizenameId, price) "
        "VALUES (?, ?, ?, ?)",
        (
            logname,
            body["pictureId"],
            body["sizenameId"],
            0
        )
    )
    cur.fetchone()
    cur = connection.execute(
        "SELECT picturepriceId "
        "FROM pictureprices "
        "ORDER BY picturepriceId DESC "
        "LIMIT 1",
        (
        )
    )
    return flask.jsonify(cur.fetchone()), 201


@pennington_photo.app.route("/api/v1/save/pictureprice/deselect/", methods=["POST"])
def deselect_size():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass
    
    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["picturepriceId"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    connection = get_db()
    cur = connection.execute(
        "DELETE FROM pictureprices "
        "WHERE picturepriceId = ?",
        (
            body["picturepriceId"],
        )
    )
    cur.fetchone()
    return flask.jsonify({"picturepriceId": None}), 201


@pennington_photo.app.route("/api/v1/save/price/", methods=["POST"])
def update_price():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["picturepriceId", "price"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    price = body["price"]
    if price == '':
        price = 0
        pass
    price = int(price)
    pictureprice_id = body["picturepriceId"]
    if not pictureprice_id:
        flask.abort(400)
        pass
    
    connection = get_db()
    cur = connection.execute(
        "UPDATE pictureprices "
        "SET price = ? "
        "WHERE picturepriceId = ?",
        (
            price,
            pictureprice_id,
        )
    )
    cur.fetchone()
    return flask.Response(status=204)


@pennington_photo.app.route("/api/v1/save/sizename/", methods=["POST"])
def update_sizename():
    logname = check_session()
    if not logname:
        flask.abort(403)
        pass

    body = flask.request.get_json()
    if body is None:
        flask.abort(400)
        pass

    keys = ["sizenameId", "info"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass
    
    connection = get_db()
    cur = connection.execute(
        "UPDATE sizenames "
        "SET name = ? "
        "WHERE sizenameId = ?",
        (
            body["info"],
            body["sizenameId"],
        )
    )
    cur.fetchone()
    return flask.Response(status=204)
