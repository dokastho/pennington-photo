"""Handle Cart Requests."""

import flask
import pennington_photo


@pennington_photo.app.route('/api/v1/cart/status/', methods=["POST"])
def cart_status():
    body = flask.request.json
    if body is None:
        flask.abort(400)
        
    if 'uuid' not in body:
        flask.abort(400)

    uuid = body['uuid']
    
    if 'cart' not in flask.session:
        return flask.jsonify({'in': False}), 200

    for photo in flask.session['cart']:
        if photo['uuid'] == uuid:
            return flask.jsonify({'in': True}), 200
        pass

    return flask.jsonify({'in': False}), 200


@pennington_photo.app.route('/api/v1/cart/add/', methods=['POST'])
def cart_add():
    body = flask.request.json
    if body is None:
        flask.abort(400)
        
    if 'photo' not in body:
        flask.abort(400)

    photo = body['photo']

    if 'cart' not in flask.session:
        flask.session['cart'] = []
    
    cart = flask.session['cart']

    cart.append(photo)

    flask.session['cart'] = cart
    
    return flask.Response(status=204)


@pennington_photo.app.route('/api/v1/cart/remove/', methods=['POST'])
def cart_remove():
    body = flask.request.json
    if body is None:
        flask.abort(400)
        
    if 'photo' not in body:
        flask.abort(400)

    photo = body['photo']

    if 'cart' not in flask.session:
        return flask.Response(status=204)

    if photo in flask.session['cart']:
        flask.session['cart'].pop(photo)

    return flask.Response(status=204)
