"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

run command
"""

import click
import os
import pennington_photo

app = pennington_photo.app


@click.command("run")
def main():
    """Run the Pennington Photographic Server"""

    if not os.path.isfile(pennington_photo.app.config['SITE_ROOT'] / "static" / "js" / "index.bundle.js"):
        print("This app has not been installed yet.\n\nInstall with `pphoto install`")
        exit(1)

    app.run(host='0.0.0.0', port=app.config["MY_PORT"])
    pass


if __name__ == "__main__":
    main()
    pass
