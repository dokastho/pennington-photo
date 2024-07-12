"""Handle Cart Requests."""

import flask
import hashlib
import pennington_photo
from pennington_photo.common.model import get_db


def do_hash(s: str, sn_id: int) -> str:
    m = hashlib.sha256()
    m.update(s.encode('utf-8'))
    m.update(sn_id.to_bytes(length=8, byteorder='big'))
    return m.hexdigest()


@pennington_photo.app.route('/api/v1/cart/contents/')
def get_cart_contents():
    data = {
        'cart': []
    }

    connection = get_db()

    if 'cart' in flask.session:
        for photo in flask.session['cart'].values():
            uuid = photo['uuid']
            photo['uuid'] = uuid
            if 'price' not in photo:
                photo['price'] = 0
            if 'size' not in photo:
                photo['size'] = ""
            cur = connection.execute(
                "SELECT s.name as info, pp.price "
                "FROM sizenames s "
                "INNER JOIN pictureprices pp "
                "ON s.sizenameId = pp.sizenameId "
                "LEFT JOIN pictures p "
                "USING(pictureId) "
                "WHERE p.uuid = ?",
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

    for photo in flask.session['cart'].values():
        if uuid == photo['uuid']:
            return flask.jsonify({'in': True}), 200

    return flask.jsonify({'in': False}), 200


@pennington_photo.app.route('/api/v1/cart/add/', methods=['POST'])
def cart_add():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'photo' not in body:
        flask.abort(400)
    if 'cart' not in flask.session:
        flask.session['cart'] = dict()
        pass

    item = body['photo']
    key = do_hash(item['uuid'], item['sizenameId'])

    cart = flask.session['cart']

    if key in cart.keys():
        cart[key]['qty'] += 1
        pass

    else:
        connection = get_db()
        cur = connection.execute(
            "SELECT name "
            "FROM sizenames "
            "WHERE sizenameId = ?",
            (item['sizenameId'],)
        )
        sizename = cur.fetchone()['name']
        val = {
            'name': item['name'],
            'uuid': item['uuid'],
            'size': sizename,
            'sizenameId': item['sizenameId'],
            'qty': 1,
        }
        val["hashId"] = key
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
            'qty': int(photo['qty']),
            'size': photo['size'],
            'price': photo['price'],
            'uuid': photo['uuid'],
            'hashId': photo['hashId']
        }
        cart_p[photo['hashId']] = val
        pass

    flask.session['cart'] = cart_p

    return flask.Response(status=204)


@pennington_photo.app.route('/api/v1/cart/remove/', methods=['POST'])
def cart_remove():
    body = flask.request.json
    if body is None:
        flask.abort(400)

    if 'hashId' not in body:
        flask.abort(400)

    item = body['hashId']

    if 'cart' not in flask.session:
        return flask.Response(status=204)

    cart = flask.session['cart']

    if item in cart.keys():
        cart.pop(item)
        pass

    flask.session['cart'] = cart

    return flask.Response(status=204)
