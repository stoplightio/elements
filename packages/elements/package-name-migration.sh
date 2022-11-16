#!/usr/bin/env sh

index_array=(
's/abbudao\/elements-core/\@abbudao\/elements-core/g'
)

rm -rf node-modules
for i in ${index_array[@]}
do
  find . -type f -exec sed -i $i {} +
done
yarn
