"""Handle requests and sending emails."""

import flask
import pennington_photo
from pennington_photo.common.model import get_db

@pennington_photo.app.route('/api/v1/contact/', methods=['POST'])
def handle_contact():
    body = flask.request.form
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "email", "message", "photos"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    email = body["email"]
    message = body["message"]
    photos = flask.request.form.getlist("photos")
    # ... send email
    pass
