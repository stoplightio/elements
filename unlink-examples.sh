#!/bin/bash
packages=( elements elements-dev-portal elements-core )
example=$1

cd examples/$example && yarn unlink "@stoplight/elements" && yarn unlink "@stoplight/elements-dev-portal" && yarn unlink "@stoplight/elements-core" && yarn install --check-files 

cd ../../
