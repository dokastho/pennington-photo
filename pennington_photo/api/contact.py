"""Handle requests and sending emails."""

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
    if checkout:
        cart = flask.session["cart"]
        flask.session.clear()
        context = {
            "cart": cart,
            "name": name,
            "email": email,
            "message": message,
            "total_cost" : total_cost
        }
        pass
    else:
        context = {
            "name": name,
            "email": email,
            "message": message,
        }
        pass

    # ... send email

    total_cost = 0
    for item in cart.values():
        total_cost += item['price']

    

    invoice = flask.render_template("invoice.html", **context)
    send_email_ses(invoice, context["name"])

    return flask.redirect("/contact")


def send_email_ses(body_content: str, sender_name: str):
    sender = "Pennington Photographics <noreply@penningtonphotographic.com>"
    recipient = "tjdokas@gmail.com"
    charset = "UTF-8"
    region = "us-east-1"

    # Create a new SES resource and specify a region.
    client = boto3.client('ses',region_name=region)

    # Try to send the email.
    try:
        #Provide the contents of the email.
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
                    'Data': f"Invoice Order From {sender_name}",
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