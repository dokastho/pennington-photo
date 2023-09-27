"""Handle Cart Requests."""

import flask
import pennington_photo
from pennington_photo.common.model import get_db


@pennington_photo.app.route('/api/v1/cart/contents/')
def get_cart_contents():
    data = {
        'cart': []
    }
    
    connection = get_db()

    if 'cart' in flask.session:
        for uuid, photo in flask.session['cart'].items():
            photo['uuid'] = uuid
            cur = connection.execute(
                "SELECT info, price "
                "FROM sizes s "
                "LEFT JOIN pictures p "
                "USING(pictureId) "
                "WHERE offered "
                "AND p.uuid = ?",
                (uuid,)
            )
            photo["sizes"] = cur.fetchall()
            data['cart'].append(photo)
            pass
        pass

    return flask.jsonify(data), 200


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


@pennington_photo.app.route('/api/v1/cart/update/', methods=['POST'])
def cart_update():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'cart' not in body:
        flask.abort(400)

    cart: 'list[dict]' = body['cart']
    cart_p = dict()

    for photo in cart:
        val = {
            'name': photo['name'],
            'qty': photo['qty'],
        }
        cart_p[photo['uuid']] = val
        pass
    
    flask.session['cart'] = cart_p

    return flask.Response(status=204)


@pennington_photo.app.route('/api/v1/cart/remove/', methods=['POST'])
def cart_remove():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'uuid' not in body:
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
