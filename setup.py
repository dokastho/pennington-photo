"""
Pennington Photographics

TJ Dokas <mailto:tjdokas@gmail.com>

Package setup script
"""

from setuptools import setup, find_packages
import os


def package_files(directory):
    paths = []
    for (path, directories, filenames) in os.walk(directory):
        for filename in filenames:
            paths.append(os.path.join('..', path, filename))
    return paths


extra_files = package_files('pennington_photo')


setup(
    name='pennington-photo',
    version='0.1.0',
    packages=['pennington_photo'],
    package_data={'': extra_files},
    author="Thomas Dokas",
    author_email="tjdokas@gmail.com",
    url="https://penningtonphotographic.com",
    description="Don Pennington's online photographics gallery & store",
    include_package_data=True,
    install_requires=[
        'arrow',
        'bs4',
        'Flask',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'pytest',
        'requests',
        'selenium',
    ],
    python_requires='>=3.9',
)
