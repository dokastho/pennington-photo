"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

main command
"""

from pennington_photo.commands import install, run
import click


@click.group()
@click.version_option(prog_name="Don Pennington's online photographics gallery & store", package_name="pennington_photo")
def main():
    pass


main.add_command(run.main)
main.add_command(install.main)

if __name__ == "__main__":
    main()
