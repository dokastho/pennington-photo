import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/contact/")
def show_contact():
    """Render galleries for the site."""

    return flask.render_template("contact.html")
