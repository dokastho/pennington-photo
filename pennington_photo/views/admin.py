import pennington_photo
import flask
from pennington_photo.common.model import check_session


@pennington_photo.app.route("/admin/")
def show_admin():
    """Render content creator tools for the site."""
    if not check_session():
        return flask.redirect('/accounts/login/')

    context = {
        'logname': flask.session['logname']
    }

    return flask.render_template("admin.html", **context)
