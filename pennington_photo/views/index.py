import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/")
def show_index():
    """Render index for the site."""

    return flask.redirect("/home/")


@pennington_photo.app.route("/home/")
def show_home():
    """Render index for the site."""

    return flask.render_template("index.html")


@pennington_photo.app.route("/user/<uname>/")
def show_user(uname):
    """Show profile options for uname."""
    logname = check_session()
    if not logname:
        return flask.redirect("/accounts/login/")

    if logname != uname:
        return flask.abort(403)

    context = {
        "logname": logname
    }

    return flask.render_template("accounts.html", **context)
