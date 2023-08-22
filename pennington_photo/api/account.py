"""accounts interface."""
import uuid
import hashlib
import os
import pennington_photo
import arrow
from pennington_photo.common import model
from flask import abort, redirect, render_template, Response, request, session


@pennington_photo.app.route('/accounts/', methods=['POST'])
def accounts():
    """/accounts/?target=URL Immediate redirect. No screenshot."""
    with pennington_photo.app.app_context():
        connection = model.get_db()

        # check if target is unspecified or blank
        target = model.get_target()
        # get operation
        operation = request.form.get('operation')
        if operation is None:
            operation = request.get_json()["operation"]

        # create a login cookie
        if operation == "login":

            # get username and password from form
            uname = request.form['username']
            pword = request.form['password']

            # set session cookie
            if not do_login(uname, pword):
                return redirect("/accounts/login/?badlogin=1")
            session['logname'] = uname

        # create an account
        elif operation == "create":
            info = {
                "username": request.form.get("username"),
                "email": request.form.get("email"),
                "password": request.form.get("password")
            }
            if not do_create(connection, info):
                # username is taken
                return redirect("/accounts/create/?baduser=1")

            session['logname'] = info['username']

        elif operation == "delete":
            do_delete(connection)
            return Response(status=204)

        elif operation == "update_password":
            # user must be logged in
            if 'logname' not in session:
                abort(403)

            info = {
                "username": session['logname'],
                "new": request.form.get("newpw"),
                "verify_new": request.form.get("renewpw"),
            }
            do_update_password(connection, info)
            return Response(status=204)

        else:
            abort(400)  # invalid request

    return redirect(target)


def do_login(uname, pword):
    """Login user with username and password."""
    logname = model.check_authorization(uname, pword)
    if not logname:
        return False

    return True


def do_create(connection, info):
    """Create account with info."""
    for i in info:
        if i == "":
            abort(400)

    utc = arrow.utcnow()
    local = utc.to('US/Pacific')
    timestamp = local.format()

    pp_str = model.get_uuid(info['file'].filename)
    pw_str = create_hashed_password(info['password'])

    cur = connection.execute(
        "SELECT username "
        "FROM users "
        "WHERE username == ? ",
        (info['username'],)
    )
    user = cur.fetchall()
    if len(user) != 0:
        return False

    # save image
    path = pennington_photo.app.config["UPLOAD_FOLDER"]/pp_str
    info['file'].save(path)

    cur = connection.execute(
        "INSERT INTO users "
        "(username, fullname, email, filename, password, created) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        (
            info['username'], info['name'], info['email'],
            pp_str, pw_str, timestamp
        )
    )
    cur.fetchall()

    return True


def do_delete(connection):
    """Delete account of logname."""
    # user must be logged in
    if 'logname' not in session:
        abort(403)
        
    if not model.get_logname():
        abort(403)

    uname = request.get_json()["user"]

    # delete users entry and all related ones
    cur = connection.execute(
        "DELETE FROM users "
        "WHERE username == ?",
        (uname,)
    )
    cur.fetchall()

    # clear the session
    session.clear()


def do_update_password(connection, info):
    """Update password with info."""
    if (info['new'] is None or
            info['verify_new'] is None):
        abort(400)

    if info['new'] != info['verify_new']:
        abort(401)

    new_pw_hash = create_hashed_password(info['new'])
    cur = connection.execute(
        "UPDATE users "
        "SET password = ? "
        "WHERE username == ? ",
        (new_pw_hash, info['username'],)
    )
    cur.fetchone()


@pennington_photo.app.route('/accounts/login/')
def login():
    """Render login page."""
    with pennington_photo.app.app_context():

        # redirect if a session cookie exists
        if 'logname' not in session:
            badlogin = request.args.get("badlogin", type=bool, default=False)
            context = {
                "badlogin": badlogin,
            }
            return render_template("login.html", **context)

        # if there doesn't exist a session cookie,
        # redirect to /accounts/?target=/login/ to create one
        return redirect('/')


@pennington_photo.app.route('/accounts/logout/', methods=['GET'])
def logout():
    """Log out user and redirects to login."""
    session.clear()
    return redirect('/')


def create_hashed_password(pword):
    """Create a hashed password for a new user."""
    algorithm = 'sha512'
    salt = uuid.uuid4().hex
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + pword
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])
    return password_db_string


def encrypt(salt, pword):
    """One way decryption given the plaintext pw and salt from user db."""
    algorithm = 'sha512'

    hash_obj = hashlib.new(algorithm)
    password_salted = salt + pword
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])
    return password_db_string
