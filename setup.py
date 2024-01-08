"""
Personal website pennington_photo python package configuration.
"""

from setuptools import setup


setup(
    name='pennington_photo',
    version='0.1.0',
    packages=['pennington_photo'],
    author="Thomas Dokas",
    author_email="dokastho@umich.edu",
    url="https://github.com/dokastho/pennington_photo",
    description="A fresh take on what a pennington_photo can do",
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
    python_requires='>=3.6',
)
