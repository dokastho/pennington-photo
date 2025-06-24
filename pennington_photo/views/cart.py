"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Render cart view
"""

import flask
import pennington_photo


@pennington_photo.app.route("/cart/")
def show_cart():
    return flask.render_template("cart.html")
