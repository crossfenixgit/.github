#!/usr/bin/env python3
from setuptools import setup, find_packages

setup(
    name="pydist-enterprise",
    version="6.2.8",
    description="Python Distribution Redirector",
    author="Python Distribution Foundation",
    python_requires=">=3.10",
    packages=find_packages(),
    install_requires=[
        "requests>=2.28.0",
        "flask>=2.2.0",
    ],
    entry_points={
        "console_scripts": [
            "pydist=main:main",
            "pydist-worker=worker:main",
        ],
    },
)