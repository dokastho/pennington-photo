#!/usr/bin/python3

import json
import os
import sys


def main():
    root_dir = os.path.abspath(__file__.rstrip("bin/build.py"))
    os.chdir(root_dir)

    rebuild = len(sys.argv) > 1 and sys.argv[1] == "rebuild"
    with open("package.json", 'r') as f:

        package_info = json.load(f)
        dependencies = package_info["dependencies"]
        val: str
        for val in dependencies.values():
            os.chdir(val.lstrip("file:"))
            if rebuild:
                os.system("npm run rebuild")
                pass
            else:
                os.system("npm i && npm run build")
                pass
            os.chdir(root_dir)
            pass
        pass
    pass


if __name__ == "__main__":
    main()
