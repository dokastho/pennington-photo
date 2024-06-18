#!/home/ubuntu/pennington-photo/env/bin/python3

import flask
import pennington_photo

app = pennington_photo.app

if __name__ == "__main__":
    app.run(port=8186)
