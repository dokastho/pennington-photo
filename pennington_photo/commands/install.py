"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

install command
"""

import click
import pennington_photo
import os
import subprocess


def setup_step(step_name: str, cmd: str):
    ok_color = "\u001b[42m"
    err_color = "\u001b[41m"
    reset_color = "\033[0m"
    print(f"EXEC > {ok_color} {step_name} {reset_color}")
    ret = subprocess.run(f"source {os.environ['HOME']}/.zshrc && {cmd}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if ret.returncode != 0:
        with open("install.log", "w") as fp:
            fp.write(cmd)
            fp.write(": ")
            fp.write(ret.stderr.decode())
            pass
        raise Exception(
            f"FAIL > {err_color} {step_name} {reset_color} ({__name__})")
    return 0


@click.command("install")
def main():
    """Install required binaries and build the front end
    """
    root_dir = pennington_photo.app.config["SITE_ROOT"]
    home_dir = os.environ["HOME"]
    os.chdir(root_dir)
    os.makedirs(root_dir / 'static' / 'js', exist_ok=True)
    os.makedirs(root_dir / 'var', exist_ok=True)

    if not os.path.isfile(root_dir / 'var' / 'pennington_photo.sqlite3'):
        os.system("./bin/sitedb create")
        pass

    # install node if not installed
    if os.system("which node"):
        setup_step(
            "INSTALL NODE",
            "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
        )
        nvm_path = f'{home_dir}/.nvm'
        os.environ["NVM_DIR"] = nvm_path
        setup_step(
            "LOAD NODE CONFIG 1/2",
            '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
        )
        setup_step(
            "LOAD NODE CONFIG 2/2",
            '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
        )
        os.system(f"chmod +x {nvm_path}/nvm.sh")
        setup_step(
            "SELECT NODE VERSION",
            f"source {nvm_path}/nvm.sh && nvm install 22"
        )
        pass

    setup_step("INSTALL NODE MODULES", f"npm i")
    setup_step("BUILD SITE FRONT END", f"npm run build")
    setup_step("SUCCESS", "sleep 1")
    pass
