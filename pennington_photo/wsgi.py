#!/home/ubuntu/pennington-photo/env/bin/python3

import flask
import pennington_photo

app = pennington_photo.app

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=app.config["MY_PORT"],
    )
    pass
