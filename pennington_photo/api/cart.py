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

    if uuid in flask.session['cart'].keys():
        return flask.jsonify({'in': True}), 200

    return flask.jsonify({'in': False}), 200


@pennington_photo.app.route('/api/v1/cart/add/', methods=['POST'])
def cart_add():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'photo' not in body:
        flask.abort(400)

    item = body['photo']
    key = item['uuid']
    val = {
        'name': item['name'],
        'qty': 1,
    }

    if 'cart' not in flask.session:
        flask.session['cart'] = dict()
        pass

    cart = flask.session['cart']

    if key in cart.keys():
        cart[key]['qty'] += val['qty']
        pass
    else:
        cart[key] = val
        pass
    flask.session['cart'] = cart

    return flask.Response(status=204)


@pennington_photo.app.route('/api/v1/cart/remove/', methods=['POST'])
def cart_remove():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'photo' not in body:
        flask.abort(400)

    item = body['uuid']

    if 'cart' not in flask.session:
        return flask.Response(status=204)

    cart = flask.session['cart']
    
    if item in cart.keys():
        cart.pop(item)
        pass

    flask.session['cart'] = cart

    return flask.Response(status=204)
