#!/usr/bin/env python
from __future__ import absolute_import, print_function
from itertools import chain, imap, repeat
from setuptools import setup, find_packages
from os import walk
from os.path import join

def include_directories(in_dirs):
    paths = list()
    for directory in in_dirs:
        paths.extend(list(chain.from_iterable(imap(join, repeat(root[len('tmp') + 1:]), files) for root, _, files in walk(join('tmp', directory)))))
    return paths

package_data = include_directories([])

required_packages = []

setup(name='tmp',
      version='0.1',
      description="",
      packages=find_packages(),
      package_data={
        'tmp': package_data
      },
      install_requires=required_packages)
