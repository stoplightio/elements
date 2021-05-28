#!/bin/bash
example=$1
packages=( elements elements-dev-portal elements-core )

cd packages
for i in "${packages[@]}"
do
    cd $i/dist && yarn link && cd ../../
done


cd ../examples/$example && yarn link "@stoplight/elements" && yarn link "@stoplight/elements-dev-portal" && yarn link "@stoplight/elements-core"

cd ../../
