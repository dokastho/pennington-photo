"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Accounts views
"""

import pennington_photo
import flask
from pennington_photo.common.model import get_logname


@pennington_photo.app.route('/accounts/create/')
def show_create_page():
    if not get_logname():
        return flask.abort(403)

    return flask.render_template('create.html')
