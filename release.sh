#!/usr/bin/env bash
if yarn lerna changed
then
  yarn lerna publish from-package \
    --force-publish=@stoplight/elements,@stoplight/elements-utils, \
    --dist-tag alpha \
    --preid alpha \
    --yes 
else
  echo "No changes, skipping release."
fi
