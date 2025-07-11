"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Handle requests and sending emails
"""

import arrow
import flask
import pennington_photo
from pennington_photo.common.model import get_db
import boto3
from botocore.exceptions import ClientError


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
    checkout = body["checkout"] == "true"
    context = {}
    cart = {}
    total_cost = 0
    if checkout:
        cart = flask.session["cart"]
        flask.session.clear()
        for item in cart.values():
            total_cost += (item['price'] * item['qty'])
            pass
        context = {
            "cart": cart,
            "name": name,
            "email": email,
            "message": message,
            "total_cost": total_cost,
            "subject": f"Invoice Order From {name}",
            "checkout": True
        }
        pass
    else:
        context = {
            "name": name,
            "email": email,
            "message": message,
            "subject": f"Message From {name}",
            "checkout": False
        }
        pass

    invoice = flask.render_template("invoice.html", **context)
    send_email_ses(invoice, context["subject"])

    return flask.redirect("/")


def send_email_ses(body_content: str, subject: str):
    sender = "Pennington Photographics <noreply@penningtonphotographic.com>"
    recipient = pennington_photo.app.config["EMAIL_RECIPIENT"]
    charset = "UTF-8"
    region = "us-east-1"

    # Create a new SES resource and specify a region.
    client = boto3.client('ses', region_name=region)

    # Try to send the email.
    try:
        # Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipient,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': charset,
                        'Data': body_content,
                    },
                    'Text': {
                        'Charset': charset,
                        'Data': (body_content),
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender
        )
    # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])

    pass
