import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/about/")
def show_about():
    """Render galleries for the site."""

    return flask.render_template("about.html")
