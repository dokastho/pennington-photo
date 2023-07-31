import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/galleries/")
def show_galleries():
    """Render galleries for the site."""

    return flask.render_template("galleries.html")
