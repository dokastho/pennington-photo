"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Don Pennington's online photographics gallery & store.
Written by TJ Dokas
"""

import flask
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics
from flask import request
# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
CORS(app)
# Read settings from config module (site/config.py)
app.config.from_object('pennington_photo.config')
# Overlay settings read from a Python file whose path is set in the environment
# variable SITE_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export SITE_SETTINGS=secret_key_config.py
app.config.from_envvar('SITE_SETTINGS', silent=True)
# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import pennington_photo.api  # noqa: E402  pylint: disable=wrong-import-position
import pennington_photo.views  # noqa: E402  pylint: disable=wrong-import-position
import pennington_photo.common  # noqa: E402  pylint: disable=wrong-import-position

metrics = PrometheusMetrics(app)
metrics.register_default(
    metrics.counter(
        'by_path_counter', 'Request count by request paths',
        labels={'path': lambda: request.path}
    )
)
