"""Handle requests and sending emails."""

import arrow
import flask
import pennington_photo
from pennington_photo.common.model import get_db

@pennington_photo.app.route('/api/v1/contact/', methods=['POST'])
def handle_contact():
    body = flask.request.form
    if body is None:
        flask.abort(400)
        pass

    keys = ["name", "email", "message", "checkout"]
    for key in keys:
        if key not in body:
            flask.abort(400)
            pass
        pass

    name = body["name"]
    email = body["email"]
    message = body["message"]
    checkout = bool(body["checkout"])
    cart = {}
    if checkout:
        cart = flask.session["cart"]
        pass
    
    # ... send email
    
    context = {
        "cart": cart,
        "name": name.capitalize(),
        "email": email,
        "message": message
    }
    
    invoice = flask.render_template("invoice.html", **context)
    
    ts = arrow.utcnow()
    ts = ts.format().replace(' ', '_')
    
    with open(pennington_photo.app.config["SITE_ROOT"] / f"invoice-{name.replace(' ', '-')}-{ts}.html", "w") as fp:
        fp.writelines(invoice)
        pass
    
    return flask.redirect("/contact")
