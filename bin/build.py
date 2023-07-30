#!/usr/bin/python3

import json
import os


def main():
    root_dir = os.path.abspath(__file__.rstrip("bin/build.py"))
    os.chdir(root_dir)
    with open("package.json", 'r') as f:
        
        package_info = json.load(f)
        dependencies = package_info["dependencies"]
        val: str
        for val in dependencies.values():
            os.chdir(val.lstrip("file:"))
            os.system("npm i && npm run build")
            os.chdir(root_dir)
            pass
        pass
    pass

if __name__ == "__main__":
    main()