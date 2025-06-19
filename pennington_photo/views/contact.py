"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Contact page view
"""

import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/contact/")
def show_contact():
    """Render contact view for the site."""

    checkout = flask.request.args.get("checkout")
    context = {
        "checkout": False
    }
    if checkout:
        context["checkout"] = True
        pass

    return flask.render_template("contact.html", **context)
